import {
    ChevronRightIcon, MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon,
    PlusIcon, CheckCircleIcon, DocumentTextIcon, CubeIcon,
    ExclamationTriangleIcon, ChevronDownIcon, ChevronUpIcon, EllipsisHorizontalIcon, SunIcon, MoonIcon,
    XMarkIcon, HomeIcon, Squares2X2Icon, ArrowTrendingUpIcon, ClipboardDocumentListIcon,
    UserIcon, CalendarIcon, ChartBarIcon, ExclamationCircleIcon, ArrowRightOnRectangleIcon, PencilSquareIcon, EnvelopeIcon, SparklesIcon, ArrowPathIcon,
    PaperAirplaneIcon, ChatBubbleLeftRightIcon, PhotoIcon, PaperClipIcon
} from '@heroicons/react/24/outline'
import { Transition, TransitionChild, Popover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
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

const messages = [
    {
        id: 1,
        sender: "System",
        avatar: "",
        content: "Order #ORD-2055 has been flagged for manual review due to stock discrepancy.",
        time: "2 hours ago",
        type: "system",
    },
    {
        id: 2,
        sender: "AI Assistant",
        avatar: "AI",
        content: "I've detected a 5-item discrepancy between local and remote warehouse counts for SKU-OFF-2025-003. Recommended action: Synchronize with Warehouse DB or perform manual count.",
        time: "2 hours ago",
        type: "ai",
    },
    {
        id: 3,
        sender: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        content: "@InventoryManager I'm verifying the physical stock in Zone B. Will update shortly.",
        time: "1 hour ago",
        type: "user",
    }
]

const collaborators = [
    { name: "Sarah Chen", role: "Logistics Mgr", status: "online", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Mike Ross", role: "Warehouse Lead", status: "offline", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "AI Agent", role: "System Bot", status: "online", avatar: "AI" },
]

const documents = [
    { name: "Packing_Slip_2055.pdf", size: "245 KB", uploaded: "Jan 12, 2025" },
    { name: "Invoice_INV-8992.pdf", size: "1.2 MB", uploaded: "Jan 12, 2025" },
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
                        <NavItem icon={<HomeIcon className="w-4 h-4" />} label="Overview" active />
                        <NavItem icon={<CubeIcon className="w-4 h-4" />} label="Inventory" />
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
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                    <TabGroup className="flex-1 flex flex-col min-h-0">
                        <div className="px-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900">
                            <TabList className="flex gap-6">
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "py-4 text-sm font-medium border-b-2 outline-none transition-colors",
                                            selected
                                                ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                                                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                        )
                                    }
                                >
                                    Order Info
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        cn(
                                            "py-4 text-sm font-medium border-b-2 outline-none transition-colors",
                                            selected
                                                ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                                                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                        )
                                    }
                                >
                                    Activity Stream
                                </Tab>
                            </TabList>
                        </div>
                        <TabPanels className="flex-1 min-h-0">
                            <TabPanel className="h-full flex flex-col overflow-hidden focus:outline-none">
                                <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 p-6">
                                    {/* Left Panel: List */}
                                    <div className="col-span-8 flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                                        {/* Search and Filter Bar */}
                                        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                                            <div className="flex-1 max-w-lg relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Search SKU, Product Name..."
                                                    className="block w-full pl-10 pr-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md leading-5 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 sm:text-sm"
                                                />
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <button className="inline-flex items-center px-3 py-2 border border-zinc-300 dark:border-zinc-700 shadow-sm text-sm leading-4 font-medium rounded-md text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none">
                                                    All Materials
                                                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                                                </button>
                                                <button className="inline-flex items-center px-3 py-2 border border-zinc-300 dark:border-zinc-700 shadow-sm text-sm leading-4 font-medium rounded-md text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none">
                                                    Stock Status
                                                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Table */}
                                        <div className="flex-1 overflow-auto">
                                            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                                                <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider w-10">
                                                            <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 bg-transparent" />
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">SKU ID</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Image</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Product Name</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Properties</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Stock Level</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                                                    {items.map((item) => (
                                                        <tr
                                                            key={item.id}
                                                            onClick={() => setSelectedItem(item)}
                                                            className={cn(
                                                                "cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                                                                selectedItem.id === item.id ? "bg-zinc-50 dark:bg-zinc-800/80" : ""
                                                            )}
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 bg-transparent" />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">{item.id}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                                    <CubeIcon className="h-5 w-5 text-zinc-400" />
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div>
                                                                        <div className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                                                                            {item.name}
                                                                            {item.aiStatus && (
                                                                                <div className={cn(
                                                                                    "h-2 w-2 rounded-full",
                                                                                    item.aiStatus === 'warning' ? "bg-amber-500 shadow-[0_0_0_2px_rgba(245,158,11,0.2)]" : "bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]"
                                                                                )} />
                                                                            )}
                                                                        </div>
                                                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">{item.category}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">{item.properties}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex-1 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                                                                        <div
                                                                            className="bg-zinc-900 dark:bg-white h-1.5 rounded-full"
                                                                            style={{ width: `${(item.stock / 600) * 100}%` }}
                                                                        />
                                                                    </div>
                                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{Math.floor((item.stock / 600) * 100)}%</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={cn(
                                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                                    item.status === 'In Stock' ? "bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700" :
                                                                        item.status === 'Low Stock' ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800" :
                                                                            "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800"
                                                                )}>
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
                                    <div className="col-span-4 flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                                        {/* Details Header */}
                                        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Item Details</h3>
                                            <div className="flex gap-1">
                                                <button onClick={() => setIsDocumentModalOpen(true)} className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                    <PaperAirplaneIcon className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => setIsAiDiagnosisOpen(true)} className="relative p-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                                    <SparklesIcon className="h-4 w-4" />
                                                    <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-purple-500 ring-2 ring-white dark:ring-zinc-900" />
                                                </button>
                                                <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1 self-center" />
                                                <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                    <EllipsisHorizontalIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                            {/* AI Side Panel Section */}
                                            {selectedItem.aiStatus && (
                                                <div>
                                                    <button
                                                        onClick={() => toggleSection('aiSuggestions')}
                                                        className="flex items-center justify-between w-full mb-2 group"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <SparklesIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                            <span className="text-sm font-bold text-zinc-900 dark:text-white">AI Suggestions</span>
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                                            </span>
                                                        </div>
                                                        <ChevronDownIcon
                                                            className={cn(
                                                                "h-4 w-4 text-zinc-500 transition-transform duration-200",
                                                                sections.aiSuggestions ? "transform rotate-0" : "transform -rotate-90"
                                                            )}
                                                        />
                                                    </button>

                                                    {sections.aiSuggestions && (
                                                        selectedItem.aiStatus === 'info' ? (
                                                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                                                                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-2">Optimization Opportunity</h4>
                                                                <div className="space-y-2">
                                                                    <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded cursor-pointer hover:border-blue-500 transition-colors">
                                                                        <div className="flex gap-2">
                                                                            <div className="mt-1 h-3 w-3 rounded-full border border-zinc-400 dark:border-zinc-500"></div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-zinc-900 dark:text-white">Standard {selectedItem.name}</div>
                                                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">Listed Price</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="p-2 bg-white dark:bg-zinc-800 border-2 border-green-500 rounded cursor-pointer">
                                                                        <div className="flex gap-2">
                                                                            <div className="mt-1 h-3 w-3 rounded-full border-4 border-green-500"></div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-green-700 dark:text-green-400">Eco-Friendly {selectedItem.name}</div>
                                                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">-15% Carbon Footprint</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded cursor-pointer hover:border-purple-500 transition-colors">
                                                                        <div className="flex gap-2">
                                                                            <div className="mt-1 h-3 w-3 rounded-full border border-zinc-400 dark:border-zinc-500"></div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-purple-700 dark:text-purple-400">Premium {selectedItem.name}</div>
                                                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">+ High Durability Finish</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <button className="w-full mt-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded shadow-sm transition-colors">
                                                                        Apply Selection
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg p-3">
                                                                <div className="flex gap-3">
                                                                    <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                                                                    <div className="w-full">
                                                                        <div className="flex justify-between items-start">
                                                                            <div>
                                                                                <h4 className="text-sm font-bold text-amber-800 dark:text-amber-100">Database Discrepancy</h4>
                                                                                <p className="text-xs text-amber-700 dark:text-amber-200 mt-1">Stock count mismatch detected.</p>
                                                                            </div>
                                                                            {!isManualFixMode && (
                                                                                <button
                                                                                    onClick={() => setIsManualFixMode(true)}
                                                                                    className="text-xs text-amber-700 dark:text-amber-200 underline hover:text-amber-900 dark:hover:text-amber-100"
                                                                                >
                                                                                    Resolve Manually
                                                                                </button>
                                                                            )}
                                                                        </div>

                                                                        {!isManualFixMode ? (
                                                                            <>
                                                                                <div className="flex items-center justify-between mt-2 mb-3 px-2 py-2 bg-white/50 dark:bg-zinc-900/50 rounded">
                                                                                    <div className="text-center">
                                                                                        <div className="text-[10px] text-zinc-500 uppercase font-medium">Local</div>
                                                                                        <div className="text-sm font-bold text-zinc-900 dark:text-white">{selectedItem.stock}</div>
                                                                                    </div>
                                                                                    <ArrowPathIcon className="h-4 w-4 text-zinc-400" />
                                                                                    <div className="text-center">
                                                                                        <div className="text-[10px] text-zinc-500 uppercase font-medium">Remote</div>
                                                                                        <div className="text-sm font-bold text-amber-600 dark:text-amber-400">{(selectedItem.stock || 0) + 5}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <button className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded shadow-sm transition-colors">
                                                                                    Auto-Sync to Warehouse
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            <div className="mt-3 space-y-2">
                                                                                {/* Manual Resolution Options */}
                                                                                <div
                                                                                    onClick={() => setResolutionMethod('local')}
                                                                                    className={cn(
                                                                                        "p-2 rounded cursor-pointer border",
                                                                                        resolutionMethod === 'local' ? "bg-white dark:bg-zinc-800 border-amber-500" : "border-transparent hover:bg-white/50 dark:hover:bg-zinc-800/50"
                                                                                    )}
                                                                                >
                                                                                    <div className="flex items-center gap-2">
                                                                                        <div className={cn("h-3 w-3 rounded-full border", resolutionMethod === 'local' ? "border-4 border-amber-500" : "border-zinc-400")}></div>
                                                                                        <div>
                                                                                            <div className="text-xs font-bold text-zinc-900 dark:text-white">Keep Local Value</div>
                                                                                            <div className="text-[10px] text-zinc-500">{selectedItem.stock} items</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    onClick={() => setResolutionMethod('remote')}
                                                                                    className={cn(
                                                                                        "p-2 rounded cursor-pointer border",
                                                                                        resolutionMethod === 'remote' ? "bg-white dark:bg-zinc-800 border-amber-500" : "border-transparent hover:bg-white/50 dark:hover:bg-zinc-800/50"
                                                                                    )}
                                                                                >
                                                                                    <div className="flex items-center gap-2">
                                                                                        <div className={cn("h-3 w-3 rounded-full border", resolutionMethod === 'remote' ? "border-4 border-amber-500" : "border-zinc-400")}></div>
                                                                                        <div>
                                                                                            <div className="text-xs font-bold text-zinc-900 dark:text-white">Accept Warehouse Value</div>
                                                                                            <div className="text-[10px] text-zinc-500">{(selectedItem.stock || 0) + 5} items</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex gap-2 mt-3">
                                                                                    <button
                                                                                        onClick={() => setIsManualFixMode(false)}
                                                                                        className="flex-1 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-medium rounded hover:bg-zinc-50 dark:hover:bg-zinc-700"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            alert(`Fixed with: ${resolutionMethod}`)
                                                                                            setIsManualFixMode(false)
                                                                                        }}
                                                                                        className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded shadow-sm"
                                                                                    >
                                                                                        Confirm Fix
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                            {/* Product Overview */}
                                            <div>
                                                <button
                                                    onClick={() => toggleSection('productOverview')}
                                                    className="flex items-center justify-between w-full mb-2 group"
                                                >
                                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">Product Overview</span>
                                                    <ChevronDownIcon
                                                        className={cn(
                                                            "h-4 w-4 text-zinc-500 transition-transform duration-200",
                                                            sections.productOverview ? "transform rotate-0" : "transform -rotate-90"
                                                        )}
                                                    />
                                                </button>
                                                {sections.productOverview && (
                                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                                                            <CubeIcon className="h-12 w-12 text-zinc-300 dark:text-zinc-600" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-semibold text-zinc-900 dark:text-white">{selectedItem.name}</h4>
                                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedItem.id}</p>
                                                            <div className="flex gap-2 mt-2">
                                                                <span className={cn(
                                                                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                                                                    selectedItem.statusColor
                                                                )}>
                                                                    {selectedItem.status}
                                                                </span>
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                                                    Premium
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4" />

                                            {/* Lifecycle */}
                                            <div>
                                                <button
                                                    onClick={() => toggleSection('lifecycle')}
                                                    className="flex items-center justify-between w-full mb-2 group"
                                                >
                                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">Lifecycle Status</span>
                                                    <ChevronDownIcon
                                                        className={cn(
                                                            "h-4 w-4 text-zinc-500 transition-transform duration-200",
                                                            sections.lifecycle ? "transform rotate-0" : "transform -rotate-90"
                                                        )}
                                                    />
                                                </button>
                                                {sections.lifecycle && (
                                                    <div className="pl-4 border-l border-zinc-200 dark:border-zinc-700 ml-2 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                                        {['Material Sourced', 'Manufacturing', 'Quality Control'].map((step, i) => (
                                                            <div key={i} className="relative pb-2 last:pb-0">
                                                                <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-zinc-900 dark:bg-white" />
                                                                <p className="text-sm font-medium text-zinc-900 dark:text-white leading-none">{step}</p>
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

                                            <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4" />

                                            {/* Action Required */}
                                            <div>
                                                <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-2">Action Required</h4>
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
                            </TabPanel>
                            <TabPanel className="h-full flex focus:outline-none">
                                <div className="flex-1 flex flex-col min-w-0 bg-zinc-50 dark:bg-zinc-950/50">
                                    {/* Chat Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                        <div>
                                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Activity Stream</h3>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Real-time updates and collaboration</p>
                                        </div>
                                        <div className="flex -space-x-2">
                                            {collaborators.map((c, i) => (
                                                <div key={i} className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-900">
                                                    {c.avatar === 'AI' ? (
                                                        <div className="h-full w-full rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">AI</div>
                                                    ) : (
                                                        <img className="h-full w-full rounded-full object-cover" src={c.avatar} alt={c.name} />
                                                    )}
                                                    <span className={cn(
                                                        "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-zinc-900",
                                                        c.status === 'online' ? "bg-green-400" : "bg-zinc-300"
                                                    )} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Messages Area */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={cn("flex gap-4 max-w-3xl", msg.type === 'user' ? "ml-auto flex-row-reverse" : "")}>
                                                <div className="flex-shrink-0">
                                                    {msg.avatar === 'AI' ? (
                                                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center border border-purple-200 dark:border-purple-800">
                                                            <SparklesIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                    ) : msg.avatar ? (
                                                        <img className="h-10 w-10 rounded-full object-cover" src={msg.avatar} alt={msg.sender} />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                                                            <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={cn(
                                                    "flex-1 rounded-2xl p-4 shadow-sm",
                                                    msg.type === 'system' ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300" :
                                                        msg.type === 'ai' ? "bg-purple-50 dark:bg-purple-900/20 text-zinc-900 dark:text-zinc-100 border border-purple-100 dark:border-purple-800" :
                                                            "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
                                                )}>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className={cn(
                                                            "text-sm font-semibold",
                                                            msg.type === 'ai' ? "text-purple-700 dark:text-purple-400" : "text-zinc-900 dark:text-white"
                                                        )}>{msg.sender}</span>
                                                        <span className="text-xs text-zinc-400">{msg.time}</span>
                                                    </div>
                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                    {msg.type === 'ai' && (
                                                        <div className="mt-3 flex gap-2">
                                                            <button className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded shadow-sm transition-colors">
                                                                Sync Warehouse DB
                                                            </button>
                                                            <button className="px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-medium rounded hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                                                                Ignore
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                                        <div className="flex gap-4 max-w-4xl mx-auto">
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    placeholder="Type a message or use @ to mention..."
                                                    className="w-full pl-4 pr-12 py-3 bg-zinc-50 dark:bg-zinc-800 border-0 rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-shadow"
                                                />
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                                    <button className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
                                                        <PaperClipIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                                                <PaperAirplaneIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Sidebar: Collaborators & Docs */}
                                <div className="w-80 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
                                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Collaborators</h4>
                                        <div className="space-y-4">
                                            {collaborators.map((c, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="relative">
                                                        {c.avatar === 'AI' ? (
                                                            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">AI</div>
                                                        ) : (
                                                            <img className="h-8 w-8 rounded-full object-cover" src={c.avatar} alt={c.name} />
                                                        )}
                                                        <span className={cn(
                                                            "absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-zinc-900",
                                                            c.status === 'online' ? "bg-green-400" : "bg-zinc-300"
                                                        )} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-zinc-900 dark:text-white">{c.name}</div>
                                                        <div className="text-xs text-zinc-500">{c.role}</div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline mt-2">
                                                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
                                                    <PlusIcon className="h-3 w-3" />
                                                </span>
                                                Invite New
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1">
                                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Shared Documents</h4>
                                        <div className="space-y-3">
                                            {documents.map((doc, i) => (
                                                <div key={i} className="group flex items-start gap-3 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all cursor-pointer">
                                                    <DocumentTextIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-zinc-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {doc.name}
                                                        </p>
                                                        <p className="text-xs text-zinc-500">{doc.size} • {doc.uploaded}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="pt-2">
                                                <button className="w-full py-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors flex items-center justify-center gap-2">
                                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                                    Upload File
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
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
