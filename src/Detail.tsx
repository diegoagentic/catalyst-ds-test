import {
    ChevronRightIcon, MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon,
    PlusIcon, CheckCircleIcon, DocumentTextIcon, CubeIcon, TruckIcon,
    ExclamationTriangleIcon, ChevronDownIcon, ChevronUpIcon, EllipsisHorizontalIcon, SunIcon, MoonIcon,
    XMarkIcon, HomeIcon, ArrowTrendingUpIcon, ClipboardDocumentListIcon, Squares2X2Icon,
    UserIcon, CalendarIcon, ChartBarIcon, ExclamationCircleIcon, ArrowRightOnRectangleIcon, PencilSquareIcon, EnvelopeIcon, SparklesIcon, ArrowPathIcon
} from '@heroicons/react/24/outline'
import { Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems, Transition, TransitionChild, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Fragment } from 'react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from './useTheme'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

const items = [
    { id: "SKU-OFF-2025-001", name: "Executive Chair Pro", category: "Premium Series", properties: "Leather / Black", stock: 285, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700", aiStatus: "info" },
    { id: "SKU-OFF-2025-002", name: "Ergonomic Task Chair", category: "Standard Series", properties: "Mesh / Gray", stock: 520, status: "In Stock", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "SKU-OFF-2025-003", name: "Conference Room Chair", category: "Meeting Series", properties: "Fabric / Navy", stock: 42, status: "Low Stock", statusColor: "bg-yellow-50 text-yellow-700 ring-yellow-600/20", aiStatus: "warning" },
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
        lifecycle: true,
        aiSuggestions: true
    })
    const [isPOModalOpen, setIsPOModalOpen] = useState(false)
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [isAiDiagnosisOpen, setIsAiDiagnosisOpen] = useState(false)
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(false)
    const [isManualFixMode, setIsManualFixMode] = useState(false)
    const [resolutionMethod, setResolutionMethod] = useState<'local' | 'remote' | 'custom'>('remote')
    const [customValue, setCustomValue] = useState('')

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const { theme, toggleTheme } = useTheme()

    const onLogout = () => { console.log('Logout') }

    return (
        <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
            {/* Floating Info Navbar */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center p-2 rounded-full gap-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg">

                    {/* Logo */}
                    <div className="px-4">
                        <img src="/logo-on-light.jpg" alt="Strata" className="h-5 w-auto block dark:hidden" />
                        <img src="/logo-on-dark.jpg" alt="Strata" className="h-5 w-auto hidden dark:block" />
                    </div>

                    <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1"></div>

                    {/* Navigation Items */}
                    <div className="flex items-center gap-1">
                        <NavItem icon={<HomeIcon className="w-4 h-4" />} label="Overview" />
                        <NavItem icon={<CubeIcon className="w-4 h-4" />} label="Inventory" active />
                        <NavItem icon={<ArrowTrendingUpIcon className="w-4 h-4" />} label="Production" />
                        <NavItem icon={<ClipboardDocumentListIcon className="w-4 h-4" />} label="Orders" />
                    </div>

                    <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1"></div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 pr-2">
                        <Popover className="relative">
                            <PopoverButton className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors outline-none">
                                <Squares2X2Icon className="w-4 h-4" />
                            </PopoverButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <PopoverPanel className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[400px] p-4 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl z-[100] overflow-hidden">
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { icon: <HomeIcon className="w-8 h-8" />, label: "Portal", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
                                            { icon: <UserIcon className="w-8 h-8" />, label: "CRM", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
                                            { icon: <DocumentTextIcon className="w-8 h-8" />, label: "Invoice", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10" },
                                            { icon: <CubeIcon className="w-8 h-8" />, label: "Inventory", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
                                            { icon: <ChartBarIcon className="w-8 h-8" />, label: "Analytics", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10" },
                                            { icon: <ExclamationCircleIcon className="w-8 h-8" />, label: "Support", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
                                            { icon: <Squares2X2Icon className="w-8 h-8" />, label: "Board", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                                            { icon: <CalendarIcon className="w-8 h-8" />, label: "Calendar", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
                                            { icon: <EllipsisHorizontalIcon className="w-8 h-8" />, label: "More", color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800" },
                                        ].map((app, i) => (
                                            <button key={i} className="flex flex-col items-center gap-3 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all group">
                                                <div className={`p-3 rounded-2xl ${app.bg} ${app.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                                    {app.icon}
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">{app.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </PopoverPanel>
                            </Transition>
                        </Popover>

                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                        </button>

                        <div className="relative group">
                            <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                    JD
                                </div>
                                <div className="text-left hidden md:block">
                                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">Jhon Doe</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Admin</p>
                                </div>
                                <ChevronDownIcon className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                            </button>
                            {/* User Dropdown */}
                            <div className="absolute top-full right-0 mt-2 w-48 py-1 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-white/10">
                                    <p className="text-sm font-medium">Jhon Doe</p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                                <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2">
                                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Header (moved from original header, adjusted for floating nav) */}
            <div className="pt-24 px-6 pb-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-transparent transition-colors duration-200">
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
                </div>
            </div>

            <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
                {/* Collapsible Summary */}
                {isSummaryExpanded ? (
                    <>
                        <div className="flex justify-end mb-2">
                            <button onClick={() => setIsSummaryExpanded(false)} className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                Hide Details <ChevronUpIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-in fade-in zoom-in duration-300">
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

                        {/* Integrated Stepper */}
                        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="relative pb-2">
                                <div className="absolute top-[15px] left-0 w-full h-[2px] bg-zinc-200 dark:bg-zinc-800" />
                                <div className="relative z-10 flex justify-between w-full max-w-4xl mx-auto px-4">
                                    {[
                                        { name: 'Category Selected', status: 'completed' },
                                        { name: 'Item List Viewing', status: 'current' },
                                        { name: 'Details Pending', status: 'pending' },
                                        { name: 'Edit Pending', status: 'pending' },
                                        { name: 'Complete Pending', status: 'pending' }
                                    ].map((step, i) => (
                                        <div key={i} className="flex flex-col items-center group cursor-default">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-zinc-5 dark:ring-zinc-950 transition-all duration-300",
                                                step.status === 'completed' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' :
                                                    step.status === 'current' ? 'bg-white dark:bg-zinc-900 border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white' :
                                                        'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600'
                                            )}>
                                                {step.status === 'completed' ? <CheckCircleIcon className="w-5 h-5" /> :
                                                    step.status === 'current' ? <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white" /> :
                                                        <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />}
                                            </div>
                                            <div className="mt-3 text-center">
                                                <p className={cn(
                                                    "text-xs font-semibold transition-colors duration-300",
                                                    step.status === 'completed' || step.status === 'current' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'
                                                )}>{step.name.split(' ')[0]}</p>
                                                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{step.name.split(' ').slice(1).join(' ')}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                            {[
                                { label: 'Total SKUs', value: '450' },
                                { label: 'Available', value: '400' },
                                { label: 'Low Stock', value: '15', color: 'text-yellow-600 dark:text-yellow-400' },
                                { label: 'Out of Stock', value: '8', color: 'text-red-600 dark:text-red-400' },
                            ].map((stat, i) => (
                                <Fragment key={i}>
                                    <div className="flex items-center gap-2 whitespace-nowrap">
                                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{stat.label}:</span>
                                        <span className={cn("text-lg font-bold leading-none mt-1", stat.color || "text-zinc-900 dark:text-white")}>{stat.value}</span>
                                    </div>
                                    {i < 3 && <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-700 hidden sm:block"></div>}
                                </Fragment>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            {/* Current Phase Indicator */}
                            <div className="flex items-center gap-3 hidden md:flex">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Current Phase</span>
                                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Item List Viewing</span>
                                </div>
                                <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-zinc-900 dark:border-white bg-white dark:bg-zinc-900">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white" />
                                </div>
                            </div>

                            <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-700 hidden xl:block mx-2"></div>

                            <button
                                onClick={() => setIsSummaryExpanded(true)}
                                className="flex flex-col items-center justify-center gap-1 group p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Show Details</span>
                            </button>
                        </div>
                    </div>
                )}



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
                                            className={cn(
                                                "cursor-pointer transition-all duration-200",
                                                selectedItem.id === item.id
                                                    ? 'bg-blue-50 dark:bg-blue-900/10 shadow-[inset_3px_0_0_0_#3b82f6] dark:shadow-[inset_3px_0_0_0_#60a5fa]'
                                                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                            )}
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
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={cn("text-sm font-medium", selectedItem.id === item.id ? "text-blue-600 dark:text-blue-400" : "text-zinc-900 dark:text-white")}>
                                                            {item.name}
                                                        </span>
                                                        {(item as any).aiStatus && (
                                                            <span className="flex h-2 w-2 relative">
                                                                <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", (item as any).aiStatus === 'warning' ? 'bg-orange-400' : 'bg-blue-400')}></span>
                                                                <span className={cn("relative inline-flex rounded-full h-2 w-2", (item as any).aiStatus === 'warning' ? 'bg-orange-500' : 'bg-blue-500')}></span>
                                                            </span>
                                                        )}
                                                    </div>
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
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" title="Edit Details" onClick={() => setIsDocumentModalOpen(true)}>
                                    <PencilSquareIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" title="Export PDF">
                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" title="Ship Now">
                                    <TruckIcon className="h-4 w-4" />
                                </button>
                                <button
                                    className="relative p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                                    title="AI Diagnosis"
                                    onClick={() => setIsAiDiagnosisOpen(true)}
                                >
                                    <SparklesIcon className="h-4 w-4" />
                                    <span className="absolute top-1 right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                    </span>
                                </button>
                                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700 mx-1"></div>
                                <button className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                                    <EllipsisHorizontalIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-4 space-y-6">


                            {/* AI Side Panel Section */}
                            {(selectedItem as any).aiStatus && (
                                <div className="space-y-3">
                                    <div
                                        className="flex items-center justify-between cursor-pointer select-none mb-2"
                                        onClick={() => toggleSection('aiSuggestions')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <SparklesIcon className="h-4 w-4 text-purple-500" />
                                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">AI Suggestions</span>
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                            </span>
                                        </div>
                                        <ChevronDownIcon className={cn("h-4 w-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200", !sections.aiSuggestions && "-rotate-90")} />
                                    </div>

                                    {sections.aiSuggestions && (
                                        <>
                                            {(selectedItem as any).aiStatus === 'info' ? (
                                                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Optimization Opportunity</p>
                                                    <div className="space-y-2">
                                                        <div className="flex items-start gap-2 p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                                            <div className="mt-0.5 h-3 w-3 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-transparent" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium">Standard {selectedItem.name}</p>
                                                                <p className="text-[10px] text-zinc-500">Listed Price</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2 p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-green-300 dark:hover:border-green-700 transition-colors">
                                                            <div className="mt-0.5 h-3 w-3 rounded-full border border-green-500 flex items-center justify-center">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-green-700 dark:text-green-400">Eco-Friendly {selectedItem.name}</p>
                                                                <p className="text-[10px] text-zinc-500">-15% Carbon Footprint</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2 p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                                                            <div className="mt-0.5 h-3 w-3 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center"></div>
                                                            <div>
                                                                <p className="text-xs font-medium text-purple-700 dark:text-purple-400">Premium {selectedItem.name}</p>
                                                                <p className="text-[10px] text-zinc-500">+ High Durability Finish</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="mt-3 w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors">Apply Selection</button>
                                                </div>
                                            ) : (
                                                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30 transition-all duration-300">
                                                    <div className="flex gap-3">
                                                        <ExclamationTriangleIcon className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">Database Discrepancy</p>
                                                                    <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Stock count mismatch detected.</p>
                                                                </div>
                                                                {!isManualFixMode && (
                                                                    <button
                                                                        onClick={() => setIsManualFixMode(true)}
                                                                        className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 underline"
                                                                    >
                                                                        Resolve Manually
                                                                    </button>
                                                                )}
                                                            </div>

                                                            {!isManualFixMode ? (
                                                                <>
                                                                    <div className="flex items-center gap-6 mt-4 mb-4 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-orange-200/50 dark:border-orange-800/30">
                                                                        <div>
                                                                            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider font-medium">Local System</span>
                                                                            <span className="text-lg font-bold text-zinc-900 dark:text-white">{selectedItem.stock}</span>
                                                                        </div>
                                                                        <ArrowPathIcon className="h-4 w-4 text-orange-400" />
                                                                        <div>
                                                                            <span className="text-[10px] text-zinc-500 block uppercase tracking-wider font-medium">Warehouse Log</span>
                                                                            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{(selectedItem.stock || 0) + 5}</span>
                                                                        </div>
                                                                    </div>

                                                                    <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wide rounded-lg shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
                                                                        Auto-Sync to Warehouse
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                                    <div className="space-y-3 mb-4">
                                                                        <label className={cn(
                                                                            "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                                                                            resolutionMethod === 'local'
                                                                                ? "bg-white dark:bg-black/20 border-orange-500 ring-1 ring-orange-500"
                                                                                : "bg-white/50 dark:bg-black/10 border-orange-200 dark:border-orange-800/50 hover:border-orange-300"
                                                                        )}>
                                                                            <div className="flex items-center gap-3">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="resolution"
                                                                                    checked={resolutionMethod === 'local'}
                                                                                    onChange={() => setResolutionMethod('local')}
                                                                                    className="text-orange-600 focus:ring-orange-500"
                                                                                />
                                                                                <div>
                                                                                    <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Keep Local Value</span>
                                                                                    <span className="block text-xs text-zinc-500">Preserve current system count</span>
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-sm font-bold text-zinc-900 dark:text-white">{selectedItem.stock}</span>
                                                                        </label>

                                                                        <label className={cn(
                                                                            "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                                                                            resolutionMethod === 'remote'
                                                                                ? "bg-white dark:bg-black/20 border-orange-500 ring-1 ring-orange-500"
                                                                                : "bg-white/50 dark:bg-black/10 border-orange-200 dark:border-orange-800/50 hover:border-orange-300"
                                                                        )}>
                                                                            <div className="flex items-center gap-3">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="resolution"
                                                                                    checked={resolutionMethod === 'remote'}
                                                                                    onChange={() => setResolutionMethod('remote')}
                                                                                    className="text-orange-600 focus:ring-orange-500"
                                                                                />
                                                                                <div>
                                                                                    <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Accept Warehouse Value</span>
                                                                                    <span className="block text-xs text-zinc-500">Update to match remote log</span>
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{(selectedItem.stock || 0) + 5}</span>
                                                                        </label>

                                                                        <label className={cn(
                                                                            "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all",
                                                                            resolutionMethod === 'custom'
                                                                                ? "bg-white dark:bg-black/20 border-orange-500 ring-1 ring-orange-500"
                                                                                : "bg-white/50 dark:bg-black/10 border-orange-200 dark:border-orange-800/50 hover:border-orange-300"
                                                                        )}>
                                                                            <div className="flex items-center gap-3">
                                                                                <input
                                                                                    type="radio"
                                                                                    name="resolution"
                                                                                    checked={resolutionMethod === 'custom'}
                                                                                    onChange={() => setResolutionMethod('custom')}
                                                                                    className="text-orange-600 focus:ring-orange-500"
                                                                                />
                                                                                <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">Custom Value</span>
                                                                            </div>
                                                                            {resolutionMethod === 'custom' && (
                                                                                <input
                                                                                    type="number"
                                                                                    className="w-20 p-1 text-right text-sm border rounded border-orange-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white dark:bg-zinc-800"
                                                                                    placeholder="#"
                                                                                    value={customValue}
                                                                                    onChange={(e) => setCustomValue(e.target.value)}
                                                                                    autoFocus
                                                                                />
                                                                            )}
                                                                        </label>
                                                                    </div>

                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => setIsManualFixMode(false)}
                                                                            className="flex-1 py-1.5 bg-white dark:bg-black/20 hover:bg-zinc-50 text-zinc-600 dark:text-zinc-400 text-xs font-semibold rounded-lg border border-orange-200 dark:border-orange-800/50 transition-colors"
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                        <button
                                                                            className="flex-1 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                                                                            onClick={() => {
                                                                                alert(`Fixed with: ${resolutionMethod === 'custom' ? customValue : (resolutionMethod === 'remote' ? (selectedItem.stock + 5) : selectedItem.stock)}`)
                                                                                setIsManualFixMode(false)
                                                                            }}
                                                                        >
                                                                            Confirm Fix
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
                                        </>
                                    )}
                                </div>
                            )}

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

                            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                            {/* Action Required */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-zinc-900 dark:text-white font-medium">
                                    <span>Action Required</span>
                                </div>
                                <div className="pl-4 border-l border-zinc-200 dark:border-zinc-700 ml-2 space-y-3">
                                    <button
                                        onClick={() => setIsPOModalOpen(true)}
                                        className="w-full py-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-bold rounded-lg shadow-sm transition-colors"
                                    >
                                        Create Purchase Order
                                    </button>
                                    <button className="w-full py-1.5 bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors">
                                        Send Acknowledgment
                                    </button>
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

            {/* Document Preview Modal */}
            <Dialog open={isDocumentModalOpen} onClose={() => setIsDocumentModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-4xl h-[80vh] flex flex-col rounded-xl bg-white dark:bg-zinc-900 shadow-2xl ring-1 ring-zinc-900/5 dark:ring-white/10 overflow-hidden">
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-800/50">
                            <DialogTitle className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                                <DocumentTextIcon className="h-5 w-5 text-zinc-500" />
                                Order Document Preview
                            </DialogTitle>
                            <button onClick={() => setIsDocumentModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-auto bg-zinc-100/50 dark:bg-black/20 p-8">
                            <div className="mx-auto max-w-[210mm] min-h-[800px] bg-white text-black p-12 shadow-sm rounded-sm">
                                <div className="flex justify-between items-end border-b-2 border-black pb-6 mb-8">
                                    <h2 className="text-3xl font-bold tracking-tight">PURCHASE ORDER</h2>
                                    <div className="text-right">
                                        <div className="font-bold text-xl mb-1">STRATA INC.</div>
                                        <div className="text-sm text-zinc-600">123 Innovation Dr.</div>
                                        <div className="text-sm text-zinc-600">Tech City, CA 94000</div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Vendor</div>
                                        <div className="font-bold text-lg">OfficeSupplies Co.</div>
                                        <div className="text-sm text-zinc-600">555 Supplier Lane</div>
                                        <div className="text-sm text-zinc-600">Logistics Park, NY 10001</div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <div className="flex justify-between w-56">
                                            <span className="text-sm font-bold text-zinc-500">PO Number:</span>
                                            <span className="text-sm font-mono font-bold">PO-2025-001</span>
                                        </div>
                                        <div className="flex justify-between w-56">
                                            <span className="text-sm font-bold text-zinc-500">Date:</span>
                                            <span className="text-sm">Jan 12, 2026</span>
                                        </div>
                                        <div className="flex justify-between w-56">
                                            <span className="text-sm font-bold text-zinc-500">Due Date:</span>
                                            <span className="text-sm">Feb 12, 2026</span>
                                        </div>
                                    </div>
                                </div>

                                <table className="w-full text-sm mb-8">
                                    <thead>
                                        <tr className="border-b-2 border-zinc-100">
                                            <th className="text-left font-bold py-3 text-zinc-500 uppercase tracking-wider text-xs">Item Description</th>
                                            <th className="text-right font-bold py-3 text-zinc-500 uppercase tracking-wider text-xs w-24">Qty</th>
                                            <th className="text-right font-bold py-3 text-zinc-500 uppercase tracking-wider text-xs w-32">Unit Price</th>
                                            <th className="text-right font-bold py-3 text-zinc-500 uppercase tracking-wider text-xs w-32">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        <tr>
                                            <td className="py-4">
                                                <div className="font-bold text-zinc-900">{selectedItem.name}</div>
                                                <div className="text-xs text-zinc-500 mt-0.5">{selectedItem.id}</div>
                                            </td>
                                            <td className="text-right py-4">50</td>
                                            <td className="text-right py-4">$45.00</td>
                                            <td className="text-right py-4 font-medium">$2,250.00</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4">
                                                <div className="font-bold text-zinc-900">Standard Shipping</div>
                                                <div className="text-xs text-zinc-500 mt-0.5">Ground Delivery (3-5 Days)</div>
                                            </td>
                                            <td className="text-right py-4">-</td>
                                            <td className="text-right py-4">$150.00</td>
                                            <td className="text-right py-4 font-medium">$150.00</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex justify-end mt-12">
                                    <div className="w-72 bg-zinc-50 p-6 rounded-lg">
                                        <div className="flex justify-between mb-3 text-sm">
                                            <span className="text-zinc-600">Subtotal:</span>
                                            <span className="font-medium">$2,400.00</span>
                                        </div>
                                        <div className="flex justify-between mb-4 pb-4 border-b border-zinc-200 text-sm">
                                            <span className="text-zinc-600">Tax (8%):</span>
                                            <span className="font-medium">$192.00</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-zinc-900">Total:</span>
                                            <span className="text-xl font-bold text-blue-600">$2,592.00</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-16 pt-8 border-t border-zinc-200">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-4">
                                            <div className="w-48 border-b border-black pb-2"></div>
                                            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Authorized Signature</div>
                                        </div>
                                        <div className="text-xs text-zinc-400">Page 1 of 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex justify-end gap-3">
                            <button
                                onClick={() => setIsDocumentModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Close
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-2">
                                <ArrowDownTrayIcon className="h-4 w-4" />
                                Download PDF
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            {/* AI Diagnosis Modal */}
            <Transition appear show={isAiDiagnosisOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAiDiagnosisOpen(false)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all ring-1 ring-zinc-900/5 dark:ring-white/10">
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-zinc-900 dark:text-white flex items-center gap-2"
                                    >
                                        <SparklesIcon className="h-5 w-5 text-purple-500" />
                                        AI Diagnosis & Suggestions
                                    </DialogTitle>
                                    <div className="mt-4 space-y-4">
                                        {/* Informative Suggestion */}
                                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                            <div className="flex gap-3">
                                                <ExclamationCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                                <div>
                                                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Category Ambiguity</h4>
                                                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                                        The item '{selectedItem.name}' matches patterns for both 'Office' and 'Home' categories. Please verify classification.
                                                    </p>
                                                    <div className="mt-3 flex gap-2">
                                                        <button className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 rounded-md text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-800/50 transition-colors">
                                                            Keep 'Office'
                                                        </button>
                                                        <button className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 rounded-md text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-800/50 transition-colors">
                                                            Move to 'Home'
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Data Fix Suggestion */}
                                        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
                                            <div className="flex gap-3">
                                                <ArrowPathIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                                                <div>
                                                    <h4 className="text-sm font-semibold text-yellow-900 dark:text-yellow-100">Stock Sync Required</h4>
                                                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                                                        Local stock count ({selectedItem.stock}) differs from Warehouse Log ({(selectedItem.stock || 0) + 5}).
                                                    </p>
                                                    <button className="mt-3 px-3 py-1.5 text-xs font-medium bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors shadow-sm">
                                                        Synchronize Database
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
                                            onClick={() => setIsAiDiagnosisOpen(false)}
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`relative flex items-center justify-center h-9 px-3 rounded-full transition-all duration-300 group overflow-hidden ${active ? 'bg-black/5 dark:bg-white/10 text-blue-600 dark:text-blue-400' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400'}`}>
            <span className="relative z-10">{icon}</span>
            <span className={`ml-2 text-sm font-medium whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out ${active ? 'max-w-xs opacity-100' : ''}`}>
                {label}
            </span>
        </button>
    )
}
