import {
    ChevronRightIcon, MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon,
    PlusIcon, CheckCircleIcon, DocumentTextIcon, CubeIcon, TruckIcon,
    ExclamationTriangleIcon, ChevronDownIcon, EllipsisHorizontalIcon, SunIcon, MoonIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from './useTheme'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock", statusColor: "bg-yellow-50 text-yellow-700 ring-yellow-600/20" },
    { id: "SKU-OFF-2025-004", name: "Visitor Stacking Chair", category: "Guest Series", properties: "Plastic / White", stock: 180, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-005", name: "Gaming Office Chair", category: "Sport Series", properties: "Leather / Red", stock: 0, status: "Out of Stock", statusColor: "bg-red-50 text-red-700 ring-red-600/20" },
    { id: "SKU-OFF-2025-006", name: "Reception Lounge Chair", category: "Lobby Series", properties: "Velvet / Teal", stock: 95, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-007", name: "Drafting Stool High", category: "Studio Series", properties: "Mesh / Black", stock: 340, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-008", name: "Bench Seating 3-Seat", category: "Waiting Series", properties: "Metal / Chrome", stock: 28, status: "Low Stock", statusColor: "bg-yellow-50 text-yellow-700 ring-yellow-600/20" },
]

export default function Detail({ onBack }: { onBack: () => void }) {
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [sections, setSections] = useState({
        quickActions: true,
        productOverview: true,
        lifecycle: true
    })
    const [isPOModalOpen, setIsPOModalOpen] = useState(false)

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const { theme, toggleTheme } = useTheme()

    return (
        <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 transition-colors duration-200">
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <button onClick={onBack} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors">
                        <ChevronRightIcon className="h-4 w-4 rotate-180 text-zinc-500 dark:text-zinc-400" />
                    </button>
                    <span className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer" onClick={onBack}>Dashboard</span>
                    <ChevronRightIcon className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                    <span>Inventory</span>
                    <ChevronRightIcon className="h-3 w-3 text-zinc-300 dark:text-zinc-600" />
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">Seating Category</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700">
                        <FunnelIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700">
                        <ArrowDownTrayIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" /> Export
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-200">
                        <PlusIcon className="h-4 w-4" /> Add New Item
                    </button>
                    <button onClick={toggleTheme} className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                        {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Category Analysis: Office Seating</h1>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        { label: 'TOTAL SKUs', value: '450' },
                        { label: 'IN PRODUCTION', value: '50' },
                        { label: 'AVAILABLE', value: '400' },
                        { label: 'LOW STOCK', value: '15' },
                        { label: 'OUT OF STOCK', value: '8', color: 'text-red-600 dark:text-red-400' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10">
                            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className={cn("text-2xl font-bold", stat.color || "text-zinc-900 dark:text-white")}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Progress Stepper */}
                <div className="relative my-4">
                    <div className="absolute top-[15px] left-0 w-full h-[2px] bg-zinc-200 dark:bg-zinc-700" />
                    <div className="relative z-10 flex justify-between w-full max-w-4xl mx-auto">
                        {['Category Selected', 'Item List Viewing', 'Details Pending', 'Edit Pending', 'Complete Pending'].map((step, i) => (
                            <div key={i} className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-950 px-2">
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center ring-1 ring-inset transition-colors", i <= 1 ? 'bg-zinc-900 dark:bg-zinc-50 ring-zinc-900 dark:ring-zinc-50 text-white dark:text-zinc-900' : 'bg-white dark:bg-zinc-900 ring-zinc-300 dark:ring-zinc-600 text-zinc-300 dark:text-zinc-600')}>
                                    {i < 1 ? <CheckCircleIcon className="h-5 w-5" /> : i === 1 ? <div className="h-2 w-2 rounded-full bg-white dark:bg-zinc-900" /> : <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />}
                                </div>
                                <span className={cn("text-xs mt-2 font-medium transition-colors", i <= 1 ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-500')}>{step.split(' ')[0]}</span>
                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 transition-colors">{step.split(' ').slice(1).join(' ')}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

                    {/* Left Panel: List */}
                    <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 flex flex-col h-full overflow-hidden">
                        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                                <input type="text" placeholder="Search SKU, Product Name..." className="pl-9 h-9 w-full rounded-md border-0 bg-zinc-50 dark:bg-zinc-800 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:focus:ring-white text-sm dark:text-white dark:placeholder-zinc-500" />
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700">All Materials <ChevronDownIcon className="h-3 w-3" /></button>
                                <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-700">Stock Status <ChevronDownIcon className="h-3 w-3" /></button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                                <thead className="bg-zinc-50 dark:bg-zinc-800/50 sticky top-0 z-10 transition-colors">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left"><input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-zinc-900 dark:focus:ring-white" /></th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">SKU ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">IMAGE</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">PRODUCT NAME</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">PROPERTIES</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">STOCK LEVEL</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                                    {items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={cn("cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors", selectedItem.id === item.id ? 'bg-zinc-50 dark:bg-zinc-800 shadow-[inset_3px_0_0_0_#18181b] dark:shadow-[inset_3px_0_0_0_#ffffff]' : '')}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <td className="px-6 py-4"><input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white focus:ring-zinc-900 dark:focus:ring-white" /></td>
                                            <td className="px-6 py-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">{item.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                    <CubeIcon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-zinc-900 dark:text-white">{item.name}</div>
                                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{item.category}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400">{item.properties}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-zinc-800 dark:bg-zinc-200" style={{ width: `${(item.stock / 600) * 100}%` }}></div>
                                                    </div>
                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{Math.floor((item.stock / 600) * 100)}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-[10px] font-medium ring-1 ring-inset", item.statusColor)}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Panel: Details */}
                    <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 flex flex-col h-full overflow-hidden text-sm">
                        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                            <h2 className="font-semibold text-zinc-900 dark:text-white">Item Details</h2>
                            <button className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"><EllipsisHorizontalIcon className="h-5 w-5" /></button>
                        </div>

                        <div className="flex-1 overflow-auto p-4 space-y-6">
                            {/* Quick Actions */}
                            <div className="space-y-2">
                                <div
                                    className="flex justify-between items-center text-zinc-900 dark:text-white font-medium cursor-pointer select-none"
                                    onClick={() => toggleSection('quickActions')}
                                >
                                    <span>Quick Actions</span>
                                    <ChevronDownIcon className={cn("h-4 w-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200", !sections.quickActions && "-rotate-90")} />
                                </div>
                                {sections.quickActions && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="flex flex-col gap-1 p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 text-left transition-colors">
                                            <DocumentTextIcon className="h-4 w-4" />
                                            <span className="text-xs font-medium">Edit Details</span>
                                        </button>
                                        <button className="flex flex-col gap-1 p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 text-left transition-colors">
                                            <ArrowDownTrayIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                            <span className="text-xs font-medium">Export PDF</span>
                                        </button>
                                        <button className="flex flex-col gap-1 p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 text-left transition-colors">
                                            <TruckIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                                            <span className="text-xs font-medium">Ship Now</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                            {/* Product Overview */}
                            <div className="space-y-3">
                                <div
                                    className="flex justify-between items-center text-zinc-900 dark:text-white font-medium cursor-pointer select-none"
                                    onClick={() => toggleSection('productOverview')}
                                >
                                    <span>Product Overview</span>
                                    <ChevronDownIcon className={cn("h-4 w-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200", !sections.productOverview && "-rotate-90")} />
                                </div>
                                {sections.productOverview && (
                                    <>
                                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                                            <CubeIcon className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">{selectedItem.name}</h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedItem.id}</p>
                                            <div className="flex gap-2 mt-2">
                                                <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", selectedItem.statusColor)}>
                                                    {selectedItem.status}
                                                </span>
                                                <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700 text-zinc-600 dark:text-zinc-300">
                                                    Premium
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                            {/* Lifecycle */}
                            <div className="space-y-3">
                                <div
                                    className="flex justify-between items-center text-zinc-900 dark:text-white font-medium cursor-pointer select-none"
                                    onClick={() => toggleSection('lifecycle')}
                                >
                                    <span>Lifecycle Status</span>
                                    <ChevronDownIcon className={cn("h-4 w-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200", !sections.lifecycle && "-rotate-90")} />
                                </div>
                                {sections.lifecycle && (
                                    <div className="pl-4 border-l border-zinc-200 dark:border-zinc-700 ml-2 space-y-6">
                                        {['Material Sourced', 'Manufacturing', 'Quality Control'].map((step, i) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center ring-4 ring-white dark:ring-zinc-900">
                                                    <CheckCircleIcon className="h-3 w-3 text-white dark:text-zinc-900" />
                                                </div>
                                                <p className="font-medium text-zinc-900 dark:text-white leading-none">{step}</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Completed Jan {5 + i * 5}, 2025</p>
                                            </div>
                                        ))}
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white ring-4 ring-white dark:ring-zinc-900" />
                                            <p className="font-medium text-zinc-900 dark:text-white leading-none">Warehouse Storage</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">In Progress</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* AI */}
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">AI Recommendations</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                </div>
                                <div className="bg-white dark:bg-zinc-900 p-3 rounded-md shadow-sm border border-zinc-100 dark:border-zinc-800 flex gap-3">
                                    <ExclamationTriangleIcon className="h-5 w-5 text-zinc-900 dark:text-white mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-zinc-900 dark:text-white">Reorder Recommendation</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 mb-2">Stock projected to reach reorder point in 10 days.</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsPOModalOpen(true)}
                                                className="px-2 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-medium rounded hover:bg-zinc-800 dark:hover:bg-zinc-200"
                                            >
                                                Create PO
                                            </button>
                                            <button className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-[10px] font-medium rounded hover:bg-zinc-50 dark:hover:bg-zinc-700">Dismiss</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isPOModalOpen} onClose={() => setIsPOModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl ring-1 ring-zinc-900/5 dark:ring-white/10">
                        <div className="flex justify-between items-start mb-4">
                            <DialogTitle className="text-lg font-semibold text-zinc-900 dark:text-white">Create Purchase Order</DialogTitle>
                            <button onClick={() => setIsPOModalOpen(false)} className="text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide">Order Summary</p>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{selectedItem.name}</span>
                                    <span className="text-sm text-zinc-900 dark:text-white">x 50 Units</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">SKU: {selectedItem.id}</span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">@ $45.00/unit</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Total Cost</span>
                                <span className="text-xl font-bold text-zinc-900 dark:text-white">$2,250.00</span>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setIsPOModalOpen(false)}
                                    className="flex-1 px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setIsPOModalOpen(false)
                                        // Add logic to submit PO
                                        alert("Purchase Order Created!")
                                    }}
                                    className="flex-1 px-3 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}
