# 🚀 Configuración de Variables de Entorno en Vercel

## Problema
La página se ve en blanco porque **faltan las variables de entorno** necesarias para conectarse a Supabase.

## Solución

### Paso 1: Obtener las credenciales de Supabase

1. Ve a [supabase.com](https://supabase.com) e inicia sesión
2. Selecciona tu proyecto (o crea uno nuevo)
3. Ve a **Settings** → **API**
4. Copia estos valores:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (comienza con `eyJ...`)

### Paso 2: Configurar en Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto **taskora-test**
3. Ve a **Settings** → **Environment Variables**
4. Agrega estas dos variables:

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | Tu Project URL de Supabase |
   | `VITE_SUPABASE_ANON_KEY` | Tu Anon Key de Supabase |

5. Selecciona **Production**, **Preview**, y **Development** para cada variable
6. Haz clic en **Save**

### Paso 3: Redesplegar

1. Ve a **Deployments**
2. Haz clic en los tres puntos `...` del último deployment
3. Selecciona **Redeploy**
4. Marca ✓ **Use existing Build Cache**
5. Haz clic en **Redeploy**

### Paso 4: Verificar

Espera unos 2-3 minutos y recarga tu página. ¡Ya debería funcionar! ✅

---

## 🔒 Variables de Entorno Locales (Opcional)

Si quieres probar localmente, crea un archivo `.env` en la raíz del proyecto:

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

⚠️ **IMPORTANTE**: Nunca subas el archivo `.env` a GitHub (ya está en `.gitignore`)
