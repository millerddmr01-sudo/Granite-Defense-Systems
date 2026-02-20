export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    price: number
                    compare_at_price: number | null
                    category: 'firearm' | 'upper' | 'lower' | 'optic' | 'accessory' | 'gear' | 'rifle' | 'pistol' | 'shotgun' | 'silencer' | 'nfa' | 'new_part' | 'used_part' | 'knife' | 'case' | 'merch' | 'service' | 'training'
                    status: 'active' | 'sold' | 'draft' | 'hidden'
                    condition: string | null
                    images: string[]
                    manufacturer: string | null
                    model: string | null
                    upc: string | null
                    mpn: string | null
                    stock_quantity: number
                    slug: string | null
                    caliber: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    price: number
                    compare_at_price?: number | null
                    category?: 'firearm' | 'upper' | 'lower' | 'optic' | 'accessory' | 'gear' | 'rifle' | 'pistol' | 'shotgun' | 'silencer' | 'nfa' | 'new_part' | 'used_part' | 'knife' | 'case' | 'merch' | 'service' | 'training'
                    status?: 'active' | 'sold' | 'draft' | 'hidden'
                    condition?: string | null
                    images?: string[]
                    manufacturer?: string | null
                    model?: string | null
                    upc?: string | null
                    mpn?: string | null
                    stock_quantity?: number
                    slug?: string | null
                    caliber?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    price?: number
                    compare_at_price?: number | null
                    category?: 'firearm' | 'upper' | 'lower' | 'optic' | 'accessory' | 'gear' | 'rifle' | 'pistol' | 'shotgun' | 'silencer' | 'nfa' | 'new_part' | 'used_part' | 'knife' | 'case' | 'merch' | 'service' | 'training'
                    status?: 'active' | 'sold' | 'draft' | 'hidden'
                    condition?: string | null
                    images?: string[]
                    manufacturer?: string | null
                    model?: string | null
                    upc?: string | null
                    mpn?: string | null
                    stock_quantity?: number
                    slug?: string | null
                    caliber?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    full_name: string | null
                    is_admin: boolean
                    created_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    is_admin?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    is_admin?: boolean
                    created_at?: string
                }
            }
        }
    }
}
