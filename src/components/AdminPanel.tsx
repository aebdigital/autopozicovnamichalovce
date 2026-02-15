'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit2, Trash2, Check, X, Image as ImageIcon, Calendar, Fuel, Activity, Cog, Gauge, Car as CarIcon, DollarSign } from 'lucide-react'

type Car = {
    id: string
    brand: string
    model: string
    year: number
    price: number
    mileage: number
    fuel: string
    transmission: string
    engine: string
    power: string
    body_type: string
    image: string
    images: string[]
    description: string
    show_on_homepage: boolean
    reserved: boolean
    features: string[]
    source: string // 'admin' 
    doors?: string
    color?: string
    site_id: string
}

export default function AdminPanel({ initialCars }: { initialCars: Car[] }) {
    const [cars, setCars] = useState<Car[]>(initialCars)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCar, setEditingCar] = useState<Car | null>(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    // Form State
    const [formData, setFormData] = useState<Partial<Car>>({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        fuel: 'Benzín',
        transmission: 'Manuál',
        engine: '',
        power: '',
        body_type: 'Sedan',
        image: '',
        images: [],
        description: '',
        show_on_homepage: false,
        reserved: false,
        features: [],
        doors: '5',
        color: ''
    })

    const [featureInput, setFeatureInput] = useState('')

    const supabase = createClient()
    const router = useRouter()

    const openModal = (car?: Car) => {
        if (car) {
            setEditingCar(car)
            setFormData(car)
        } else {
            setEditingCar(null)
            // Reset form
            setFormData({
                brand: '',
                model: '',
                year: new Date().getFullYear(),
                price: 0,
                mileage: 0,
                fuel: 'Benzín',
                transmission: 'Manuál',
                engine: '',
                power: '',
                body_type: 'Sedan',
                image: '',
                images: [],
                description: '',
                show_on_homepage: false,
                reserved: false,
                features: [],
                doors: '5',
                color: ''
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingCar(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        setUploading(true)
        const files = Array.from(e.target.files)
        const uploadedUrls: string[] = []

        for (const file of files) {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
            const filePath = `cars/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('site-uploads')
                .upload(filePath, file)

            if (uploadError) {
                console.error('Error uploading image:', uploadError)
                continue
            }

            const { data: { publicUrl } } = supabase.storage
                .from('site-uploads')
                .getPublicUrl(filePath)

            uploadedUrls.push(publicUrl)
        }

        // Update form data
        setFormData(prev => {
            const newImages = [...(prev.images || []), ...uploadedUrls]
            return {
                ...prev,
                images: newImages,
                image: prev.image || newImages[0] || '' // Set primary image if not set
            }
        })

        setUploading(false)
    }

    const removeImage = (indexToRemove: number) => {
        setFormData(prev => {
            const newImages = prev.images?.filter((_, index) => index !== indexToRemove) || []
            return {
                ...prev,
                images: newImages,
                image: newImages.length > 0 ? newImages[0] : ''
            }
        })
    }

    const addFeature = () => {
        if (!featureInput.trim()) return
        setFormData(prev => ({
            ...prev,
            features: [...(prev.features || []), featureInput.trim()]
        }))
        setFeatureInput('')
    }

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features?.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const carData = {
                ...formData,
                site_id: process.env.NEXT_PUBLIC_SITE_ID,
                source: 'admin'
            }

            if (editingCar) {
                const { error } = await supabase
                    .from('cars')
                    .update(carData)
                    .eq('id', editingCar.id)

                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('cars')
                    .insert(carData)

                if (error) throw error
            }

            router.refresh()
            // Optimistic update for better UX
            /* In a real app we'd fetch or update state directly, 
               here relying on router.refresh() might be slow so maybe update local state too if needed */

            const { data: refreshedCars } = await supabase
                .from('cars')
                .select('*')
                .eq('site_id', process.env.NEXT_PUBLIC_SITE_ID!)
                .order('created_at', { ascending: false })

            if (refreshedCars) setCars(refreshedCars as Car[])

            closeModal()

        } catch (error) {
            console.error('Error saving car:', error)
            alert('Chyba pri ukladaní vozidla. Skúste to prosím znova.')
        } finally {
            setLoading(false)
        }
    }

    const deleteCar = async (id: string) => {
        if (!confirm('Naozaj chcete odstrániť toto vozidlo?')) return

        try {
            const { error } = await supabase
                .from('cars')
                .delete()
                .eq('id', id)

            if (error) throw error

            setCars(prev => prev.filter(c => c.id !== id))
            router.refresh()
        } catch (error) {
            console.error('Error deleting car:', error)
            alert('Chyba pri odstraňovaní vozidla.')
        }
    }

    return (
        <div>
            <div className="flex justify-end mb-8">
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-[#E41C31] hover:bg-[#C8192B] text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-[#E41C31]/40"
                >
                    <Plus size={20} />
                    Pridať nové vozidlo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map(car => (
                    <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                        <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
                            {car.image ? (
                                <img
                                    src={car.image}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-300">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                {car.reserved && (
                                    <span className="bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded">REZERVOVANÉ</span>
                                )}
                                {car.show_on_homepage && (
                                    <span className="bg-[#E41C31] text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">HLAVNÉ</span>
                                )}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{car.year} • {car.body_type}</p>
                                </div>
                                <p className="text-xl font-black text-[#E41C31] whitespace-nowrap">
                                    {Number(car.price || 0).toLocaleString()} €
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 text-xs font-bold uppercase tracking-tight text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Gauge size={14} className="text-[#E41C31]" />
                                    {Number(car.mileage || 0).toLocaleString()} km
                                </div>
                                <div className="flex items-center gap-2">
                                    <Fuel size={14} className="text-[#E41C31]" />
                                    {car.fuel}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Cog size={14} className="text-[#E41C31]" />
                                    {car.transmission}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-[#E41C31]" />
                                    {car.power || '-'}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button
                                    onClick={() => openModal(car)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 py-2.5 rounded-xl transition-colors text-xs font-bold uppercase tracking-widest"
                                >
                                    <Edit2 size={16} /> Upraviť
                                </button>
                                <button
                                    onClick={() => deleteCar(car.id)}
                                    className="flex items-center justify-center w-12 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {cars.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-400 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
                        <CarIcon size={64} className="mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Nenašli sa žiadne vozidlá</h3>
                        <p className="text-sm">Začnite pridaním prvého vozidla do inventára.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl my-8 overflow-hidden">
                        <div className="flex justify-between items-center p-8 bg-gray-900 text-white">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">
                                {editingCar ? 'Upraviť vozidlo' : 'Pridať nové vozidlo'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-10">
                            {/* Basic Info */}
                            <div className="space-y-6">
                                <h3 className="text-[#E41C31] font-black uppercase tracking-widest text-[10px] pb-2 border-b border-gray-100">Základné informácie</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Značka</label>
                                        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" required placeholder="napr. Škoda" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Model</label>
                                        <input type="text" name="model" value={formData.model} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" required placeholder="napr. Octavia RS" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rok výroby</label>
                                        <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cena (€ / deň)</label>
                                        <div className="relative">
                                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-[#E41C31] font-black text-xl focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Počet najazdených km</label>
                                        <input type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Typ karosérie</label>
                                        <select name="body_type" value={formData.body_type} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all appearance-none">
                                            <option>Sedan</option>
                                            <option>SUV</option>
                                            <option>Hatchback</option>
                                            <option>Combi</option>
                                            <option>Coupe</option>
                                            <option>Kabriolet</option>
                                            <option>Van</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Technical Specs */}
                            <div className="space-y-6">
                                <h3 className="text-[#E41C31] font-black uppercase tracking-widest text-[10px] pb-2 border-b border-gray-100">Technické špecifikácie</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Palivo</label>
                                        <select name="fuel" value={formData.fuel} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all appearance-none">
                                            <option>Benzín</option>
                                            <option>Nafta</option>
                                            <option>Elektro</option>
                                            <option>Hybrid</option>
                                            <option>LPG</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prevodovka</label>
                                        <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all appearance-none">
                                            <option>Manuál</option>
                                            <option>Automat</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Motor</label>
                                        <input type="text" name="engine" placeholder="napr. 2.0 TDI" value={formData.engine || ''} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Výkon</label>
                                        <input type="text" name="power" placeholder="napr. 110 kW" value={formData.power || ''} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Farba</label>
                                        <input type="text" name="color" value={formData.color || ''} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dvere</label>
                                        <input type="text" name="doors" value={formData.doors || ''} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-gray-900 font-bold focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>

                            {/* Images */}
                            <div className="space-y-6">
                                <h3 className="text-[#E41C31] font-black uppercase tracking-widest text-[10px] pb-2 border-b border-gray-100">Fotografie</h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    {formData.images?.map((img, idx) => (
                                        <div key={idx} className="relative group aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                            <img src={img} alt={`Vozidlo ${idx}`} className="w-full h-full object-contain p-2" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 shadow-lg"
                                            >
                                                <X size={16} />
                                            </button>
                                            {idx === 0 && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 text-white text-[10px] font-black uppercase tracking-widest text-center py-2">Hlavný obrázok</div>
                                            )}
                                        </div>
                                    ))}

                                    <label className="flex flex-col items-center justify-center aspect-[4/3] border-4 border-dashed border-gray-100 rounded-[2rem] hover:border-[#E41C31]/30 hover:bg-red-50/30 transition-all cursor-pointer group">
                                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        {uploading ? (
                                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#E41C31] border-t-transparent"></div>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-[#E41C31] transition-colors">
                                                    <Plus className="text-gray-400 group-hover:text-white" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#E41C31]">Nahrať foto</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Features & Description */}
                            <div className="space-y-6">
                                <h3 className="text-[#E41C31] font-black uppercase tracking-widest text-[10px] pb-2 border-b border-gray-100">Podrobnosti</h3>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Popis</label>
                                    <textarea name="description" value={formData.description || ''} onChange={handleInputChange} rows={6} className="w-full bg-gray-50 border-none rounded-[2rem] px-6 py-5 text-gray-900 text-sm font-medium focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all resize-none" placeholder="Krátky popis vozidla..." />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Výbava</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {formData.features?.map((feature, idx) => (
                                            <span key={idx} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-tight">
                                                {feature}
                                                <button type="button" onClick={() => removeFeature(idx)} className="hover:text-[#E41C31] transition-colors"><X size={14} /></button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                            placeholder="napr. Navigácia, Kožené sedadlá..."
                                            className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-[#E41C31]/10 outline-none transition-all"
                                        />
                                        <button type="button" onClick={addFeature} className="bg-gray-900 hover:bg-black text-white px-8 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all">Pridať</button>
                                    </div>
                                </div>
                            </div>

                            {/* Visibility */}
                            <div className="space-y-6">
                                <h3 className="text-[#E41C31] font-black uppercase tracking-widest text-[10px] pb-2 border-b border-gray-100">Status a viditeľnosť</h3>

                                <div className="flex flex-wrap gap-8">
                                    <label className="flex items-center gap-4 cursor-pointer group">
                                        <div className={`w-14 h-8 flex items-center bg-gray-100 rounded-full p-1 transition-all duration-300 ${formData.reserved ? 'bg-yellow-400' : ''}`}>
                                            <div className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-all duration-300 ${formData.reserved ? 'translate-x-6' : ''}`}></div>
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900">Označiť ako rezervované</span>
                                        <input type="checkbox" name="reserved" checked={formData.reserved || false} onChange={handleInputChange} className="hidden" />
                                    </label>

                                    <label className="flex items-center gap-4 cursor-pointer group">
                                        <div className={`w-14 h-8 flex items-center bg-gray-100 rounded-full p-1 transition-all duration-300 ${formData.show_on_homepage ? 'bg-green-500' : ''}`}>
                                            <div className={`bg-white w-6 h-6 rounded-full shadow-lg transform transition-all duration-300 ${formData.show_on_homepage ? 'translate-x-6' : ''}`}></div>
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-900">Zobraziť na domovskej stránke</span>
                                        <input type="checkbox" name="show_on_homepage" checked={formData.show_on_homepage || false} onChange={handleInputChange} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-gray-100 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-8 py-4 rounded-2xl bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Zrušiť
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-10 py-4 rounded-2xl bg-[#E41C31] text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-[#C8192B] transition-all shadow-xl shadow-[#E41C31]/20 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:scale-95"
                                >
                                    {loading ? 'Ukladá sa...' : 'Uložiť vozidlo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
