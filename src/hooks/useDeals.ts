import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Deal {
    id: string
    user_id: string
    name: string
    company: string
    amount: number
    deal_date: string
    owner: string
    stage: 'negotiation' | 'won' | 'lost'
    created_at: string
    updated_at: string
}

export interface CreateDealData {
    name: string
    company: string
    amount: number
    deal_date: string
    owner: string
    stage?: 'negotiation' | 'won' | 'lost'
}

export const useDeals = () => {
    const [deals, setDeals] = useState<Deal[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchDeals = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('deals')
                .select('*')
                .order('deal_date', { ascending: false })

            if (error) throw error
            setDeals(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const createDeal = async (dealData: CreateDealData) => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('No user logged in')

            const { data, error } = await supabase
                .from('deals')
                .insert([{ ...dealData, user_id: user.id }])
                .select()
                .single()

            if (error) throw error
            setDeals([data, ...deals])
            return { data, error: null }
        } catch (err: any) {
            return { data: null, error: err.message }
        }
    }

    const updateDeal = async (id: string, dealData: Partial<CreateDealData>) => {
        try {
            const { data, error } = await supabase
                .from('deals')
                .update(dealData)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            setDeals(deals.map(d => d.id === id ? data : d))
            return { data, error: null }
        } catch (err: any) {
            return { data: null, error: err.message }
        }
    }

    const deleteDeal = async (id: string) => {
        try {
            const { error } = await supabase
                .from('deals')
                .delete()
                .eq('id', id)

            if (error) throw error
            setDeals(deals.filter(d => d.id !== id))
            return { error: null }
        } catch (err: any) {
            return { error: err.message }
        }
    }

    useEffect(() => {
        fetchDeals()
    }, [])

    return {
        deals,
        loading,
        error,
        createDeal,
        updateDeal,
        deleteDeal,
        refreshDeals: fetchDeals
    }
}
