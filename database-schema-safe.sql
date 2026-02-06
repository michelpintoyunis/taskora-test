-- Esquema simplificado y seguro para Dashboard
-- Este script es seguro para ejecutar múltiples veces

-- 1. Crear tabla de deals si no existe
CREATE TABLE IF NOT EXISTS deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  deal_date DATE NOT NULL,
  owner TEXT NOT NULL,
  stage TEXT DEFAULT 'negotiation' CHECK (stage IN ('negotiation', 'won', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Eliminar policies existentes si existen
DROP POLICY IF EXISTS "Users can view own deals" ON deals;
DROP POLICY IF EXISTS "Users can create own deals" ON deals;
DROP POLICY IF EXISTS "Users can update own deals" ON deals;
DROP POLICY IF EXISTS "Users can delete own deals" ON deals;
DROP POLICY IF EXISTS "Users can manage own deals" ON deals;

-- Crear policy única para todos los permisos
CREATE POLICY "Users can manage own deals"
  ON deals FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. Crear índice si no existe
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_deals_user_id') THEN
    CREATE INDEX idx_deals_user_id ON deals(user_id);
  END IF;
END $$;

-- 3. Trigger para actualizar updated_at (solo si no existe)
CREATE OR REPLACE FUNCTION update_deals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_deals_timestamp ON deals;
CREATE TRIGGER update_deals_timestamp
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_deals_updated_at();
