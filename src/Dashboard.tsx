import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, Transition, TransitionChild, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Fragment } from 'react'
import {
    HomeIcon, CubeIcon, ClipboardDocumentListIcon, TruckIcon,
    ArrowRightOnRectangleIcon, MagnifyingGlassIcon, BellIcon, CalendarIcon,
    CurrencyDollarIcon, ChartBarIcon, ArrowTrendingUpIcon, ExclamationCircleIcon,
    PlusIcon, DocumentDuplicateIcon, DocumentTextIcon, EnvelopeIcon, Squares2X2Icon,
    EllipsisHorizontalIcon, ListBulletIcon, SunIcon, MoonIcon,
    ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, EyeIcon, PencilIcon, TrashIcon,
    CheckIcon, MapPinIcon, UserIcon, ClockIcon, ShoppingBagIcon, ExclamationTriangleIcon, PencilSquareIcon
} from '@heroicons/react/24/outline'
import { useState, useMemo, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'

import { useTheme } from './useTheme'
import Navbar from './components/Navbar'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

const inventoryData = [
    { name: 'Seating', value: 78, amt: 480 },
    { name: 'Tables', value: 62, amt: 300 },
    { name: 'Storage', value: 45, amt: 340 },
]

const salesData = [
    { name: 'Jan', sales: 4000, costs: 2400 },
    { name: 'Feb', sales: 3000, costs: 1398 },
    { name: 'Mar', sales: 2000, costs: 9800 },
    { name: 'Apr', sales: 2780, costs: 3908 },
    { name: 'May', sales: 1890, costs: 4800 },
    { name: 'Jun', sales: 2390, costs: 3800 },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

const recentOrders = [
    { id: "#ORD-2055", customer: "AutoManfacture Co.", client: "AutoManfacture Co.", project: "Office Renovation", amount: "$385,000", status: "Pending Review", date: "Dec 20, 2025", initials: "AC", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "#ORD-2054", customer: "TechDealer Solutions", client: "TechDealer Solutions", project: "HQ Upgrade", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", initials: "TS", statusColor: "bg-blue-50 text-blue-700 ring-blue-600/20" },
    { id: "#ORD-2053", customer: "Urban Living Inc.", client: "Urban Living Inc.", project: "Lobby Refresh", amount: "$112,000", status: "Shipped", date: "Oct 30, 2025", initials: "UL", statusColor: "bg-green-50 text-green-700 ring-green-600/20" },
    { id: "#ORD-2052", customer: "Global Logistics", client: "Global Logistics", project: "Warehouse Expansion", amount: "$45,000", status: "Delivered", date: "Oct 15, 2025", initials: "GL", statusColor: "bg-gray-100 text-gray-700" },
]

export default function Dashboard({ onLogout, onNavigateToDetail }: { onLogout: () => void, onNavigateToDetail: () => void }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showMetrics, setShowMetrics] = useState(false);
    const { theme, toggleTheme } = useTheme()

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedClient, setSelectedClient] = useState('All Clients')
    const [selectedProject, setSelectedProject] = useState('All Projects')
    const [activeTab, setActiveTab] = useState<'metrics' | 'active' | 'completed' | 'all'>('active')

    const clients = ['All Clients', ...Array.from(new Set(recentOrders.map(o => o.client)))]

    // Filter projects based on selected client
    const availableProjects = useMemo(() => {
        if (selectedClient === 'All Clients') {
            return ['All Projects', ...Array.from(new Set(recentOrders.map(o => o.project)))]
        }
        return ['All Projects', ...Array.from(new Set(recentOrders.filter(o => o.client === selectedClient).map(o => o.project)))]
    }, [selectedClient])

    // Update selectedProject when selectedClient changes
    useEffect(() => {
        if (selectedClient !== 'All Clients' && availableProjects.length > 1) {
            // Auto-select first specific project as requested
            setSelectedProject(availableProjects[1])
        } else {
            setSelectedProject('All Projects')
        }
    }, [selectedClient, availableProjects])
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
    const [trackingOrder, setTrackingOrder] = useState<any>(null)

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedIds)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedIds(newExpanded)
    }

    // Dynamic Metrics Data based on current filters (Client/Project)
    const metricsData = useMemo(() => {
        const dataToAnalyze = recentOrders.filter(order => {
            const matchesProject = selectedProject === 'All Projects' || order.project === selectedProject
            const matchesClient = selectedClient === 'All Clients' || order.client === selectedClient
            return matchesProject && matchesClient
        })

        const totalValue = dataToAnalyze.reduce((sum, order) => {
            return sum + parseInt(order.amount.replace(/[^0-9]/g, ''))
        }, 0)

        const activeCount = dataToAnalyze.filter(o => !['Delivered', 'Completed'].includes(o.status)).length
        const completedCount = dataToAnalyze.filter(o => ['Delivered', 'Completed'].includes(o.status)).length

        return {
            revenue: totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }),
            activeOrders: activeCount,
            completedOrders: completedCount,
            efficiency: dataToAnalyze.length > 0 ? Math.round((completedCount / dataToAnalyze.length) * 100) : 0
        }
    }, [selectedProject, selectedClient])

    const filteredOrders = useMemo(() => {
        return recentOrders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesProject = selectedProject === 'All Projects' || order.project === selectedProject
            const matchesClient = selectedClient === 'All Clients' || order.client === selectedClient

            let matchesTab = true;
            if (activeTab === 'active') {
                matchesTab = !['Delivered', 'Completed'].includes(order.status)
            } else if (activeTab === 'completed') {
                matchesTab = ['Delivered', 'Completed'].includes(order.status)
            } else if (activeTab === 'metrics') {
                matchesTab = true // Metrics view handles its own data, this filter is for the table if shown
            }

            return matchesSearch && matchesProject && matchesClient && matchesTab
        })
    }, [searchQuery, selectedProject, selectedClient, activeTab])

    const counts = useMemo(() => {
        return {
            active: recentOrders.filter(o => !['Delivered', 'Completed'].includes(o.status)).length,
            completed: recentOrders.filter(o => ['Delivered', 'Completed'].includes(o.status)).length,
            all: recentOrders.length
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 pb-10">
            {/* Floating Info Navbar */}
            {/* Floating Info Navbar */}
            <Navbar onLogout={onLogout} activeTab="Overview" />

            {/* Main Content Content - Padded top to account for floating nav */}
            <div className="pt-24 px-4 max-w-7xl mx-auto space-y-6">
                {/* Page Title & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                                Operational Overview
                            </h1>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Jan 1 - Jan 31, 2025
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full md:w-64 pl-10 pr-3 py-2 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-white/50 dark:bg-black/20 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm transition-all shadow-sm"
                                placeholder="Search everything..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="p-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm text-gray-500">
                            <BellIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                {showMetrics ? (
                    <>
                        <div className="flex justify-end mb-2">
                            <button onClick={() => setShowMetrics(false)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Hide Details <ChevronUpIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in zoom-in duration-300">
                            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Inventory</p>
                                        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white group-hover:scale-105 transition-transform origin-left">$1.2M</p>
                                    </div>
                                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                                        <CurrencyDollarIcon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm text-green-600">
                                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                                    <span className="font-medium">+0.2%</span> <span className="text-gray-400 ml-1">vs last month</span>
                                </div>
                            </div>

                            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Efficiency</p>
                                        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white group-hover:scale-105 transition-transform origin-left">88%</p>
                                    </div>
                                    <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
                                        <ChartBarIcon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm text-green-600">
                                    <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                                    <span className="font-medium">+3.5%</span> <span className="text-gray-400 ml-1">vs last month</span>
                                </div>
                            </div>

                            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pending Orders</p>
                                        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white group-hover:scale-105 transition-transform origin-left">142</p>
                                    </div>
                                    <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl text-orange-600 dark:text-orange-400">
                                        <ClipboardDocumentListIcon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-medium">-12</span> <span className="ml-1">vs yesterday</span>
                                </div>
                            </div>

                            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Low Stock</p>
                                        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white group-hover:scale-105 transition-transform origin-left">15</p>
                                    </div>
                                    <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-600 dark:text-red-400">
                                        <ExclamationCircleIcon className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm text-red-500">
                                    <span className="font-medium">Requires attention</span>
                                </div>
                            </div>
                        </div>
                        {/* Quick Actions below grid when expanded */}
                        <div className="flex items-center gap-4 mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Quick Actions:</span>
                            {[
                                { icon: <PlusIcon className="w-5 h-5" />, label: "New Order" },
                                { icon: <DocumentDuplicateIcon className="w-5 h-5" />, label: "Duplicate" },
                                { icon: <DocumentTextIcon className="w-5 h-5" />, label: "Export PDF" },
                                { icon: <EnvelopeIcon className="w-5 h-5" />, label: "Send Email" },
                            ].map((action, i) => (
                                <button key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 text-gray-500 dark:text-gray-400 transition-all text-xs font-medium">
                                    {action.icon}
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-6 overflow-x-auto w-full scrollbar-hide">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Inventory:</span>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">$1.2M</span>
                                <span className="text-xs text-green-500 font-medium bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-md self-center">+0.2%</span>
                            </div>
                            <div className="w-px h-8 bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Efficiency:</span>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">88%</span>
                                <span className="text-xs text-green-500 font-medium bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-md self-center">+3.5%</span>
                            </div>
                            <div className="w-px h-8 bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Pending:</span>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">142</span>
                            </div>
                            <div className="w-px h-8 bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Low Stock:</span>
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">15</span>
                                <span className="text-xs text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded-md self-center">Alert</span>
                            </div>
                        </div>
                        <div className="w-px h-12 bg-gray-200 dark:bg-white/10 hidden xl:block mx-2"></div>
                        {/* Quick Actions Integrated */}
                        <div className="flex items-center gap-3 overflow-x-auto min-w-max pl-4 border-l border-gray-200 dark:border-white/10 xl:border-none xl:pl-0">
                            {[
                                { icon: <PlusIcon className="w-4 h-4" />, label: "New" },
                                { icon: <DocumentDuplicateIcon className="w-4 h-4" />, label: "Copy" },
                                { icon: <DocumentTextIcon className="w-4 h-4" />, label: "PDF" },
                                { icon: <EnvelopeIcon className="w-4 h-4" />, label: "Email" },
                            ].map((action, i) => (
                                <button key={i} className="flex flex-col items-center justify-center gap-1 group p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                    <div className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {action.icon}
                                    </div>
                                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{action.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="w-px h-12 bg-gray-200 dark:bg-white/10 hidden xl:block mx-2"></div>
                        <button
                            onClick={() => setShowMetrics(true)}
                            className="flex flex-col items-center justify-center gap-1 group p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <div className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                <ChevronDownIcon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Details</span>
                        </button>
                    </div>
                )}



                {/* Recent Orders - The Grid/List view handled here */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-3">
                        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg overflow-hidden">
                            {/* Header for Orders */}
                            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        Recent Orders
                                    </h3>
                                    {/* Tabs */}
                                    <div className="flex gap-1 mt-4 bg-gray-100 dark:bg-white/5 p-1 rounded-lg w-fit">
                                        {[
                                            { id: 'active', label: 'Active', count: counts.active },
                                            { id: 'completed', label: 'Completed', count: counts.completed },
                                            { id: 'all', label: 'All', count: counts.all },
                                            { id: 'metrics', label: 'Metrics', count: null }
                                        ].map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id as any)}
                                                className={cn(
                                                    "px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 outline-none",
                                                    activeTab === tab.id
                                                        ? "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-sm"
                                                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                                )}
                                            >
                                                {tab.id === 'metrics' && <ChartBarIcon className="w-4 h-4" />}
                                                {tab.label}
                                                {tab.count !== null && (
                                                    <span className={cn(
                                                        "text-xs px-1.5 py-0.5 rounded-full transition-colors",
                                                        activeTab === tab.id
                                                            ? "bg-gray-100 dark:bg-zinc-700"
                                                            : "bg-gray-200 dark:bg-zinc-800 group-hover:bg-gray-300 dark:group-hover:bg-zinc-700"
                                                    )}>
                                                        {tab.count}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="relative group">
                                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search orders..."
                                            className="pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    {/* Client Filter */}
                                    <div className="relative group">
                                        <select
                                            className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                            value={selectedClient}
                                            onChange={(e) => setSelectedClient(e.target.value)}
                                        >
                                            {clients.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>

                                    {/* Project Filter */}
                                    <div className="relative group">
                                        <select
                                            className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                            value={selectedProject}
                                            onChange={(e) => setSelectedProject(e.target.value)}
                                        >
                                            {availableProjects.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                        <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>

                                    <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1 hidden sm:block"></div>

                                    <div className="flex bg-gray-100 dark:bg-black/30 p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            <ListBulletIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-800 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            <Squares2X2Icon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 bg-gray-50/50 dark:bg-black/20 min-h-[300px]">
                                {activeTab === 'metrics' ? (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Metrics</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {selectedClient === 'All Clients' ? 'Overview across all clients' : `Showing analytics for ${selectedClient}`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-300">
                                            {/* Revenue Card */}
                                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl p-6 border border-green-200 dark:border-green-800/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-green-700 dark:text-green-400">Total Revenue</p>
                                                    <CurrencyDollarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">{metricsData.revenue}</p>
                                                    <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">Based on visible orders</p>
                                                </div>
                                            </div>

                                            {/* Active Orders Card */}
                                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Active Orders</p>
                                                    <ShoppingBagIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{metricsData.activeOrders}</p>
                                                    <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">In production or pending</p>
                                                </div>
                                            </div>

                                            {/* Completion Rate Card */}
                                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-800/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-purple-700 dark:text-purple-400">Completion Rate</p>
                                                    <ChartBarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{metricsData.efficiency}%</p>
                                                    <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">Orders delivered successfully</p>
                                                </div>
                                            </div>

                                            {/* Project Count Card */}
                                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-6 border border-orange-200 dark:border-orange-800/20 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-medium text-orange-700 dark:text-orange-400">Project Count</p>
                                                    <ClipboardDocumentListIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                                                        {availableProjects.length > 0 && availableProjects[0] === 'All Projects' ? availableProjects.length - 1 : availableProjects.length}
                                                    </p>
                                                    <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">Active projects</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-[300px] w-full bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
                                            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Monthly Trends</h4>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={salesData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                                                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                    />
                                                    <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                ) : viewMode === 'list' ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
                                            <thead>
                                                <tr>
                                                    <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                    <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                                    <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                    <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th className="relative px-3 py-3.5"><span className="sr-only">Actions</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-white/10 bg-transparent">
                                                {filteredOrders.map((order) => (
                                                    <Fragment key={order.id}>
                                                        <tr
                                                            className={`hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer ${expandedIds.has(order.id) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                                            onClick={() => toggleExpand(order.id)}
                                                        >
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                                {expandedIds.has(order.id) ? <ChevronDownIcon className="h-4 w-4 text-blue-500" /> : <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
                                                                {order.id}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-200">{order.initials}</div>
                                                                    {order.customer}
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{order.amount}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                                <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset", order.statusColor)}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{order.date}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium">
                                                                <Menu as="div" className="relative inline-block text-left">
                                                                    <MenuButton onClick={(e) => e.stopPropagation()} className="bg-transparent p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                                                        <EllipsisHorizontalIcon className="h-5 w-5" />
                                                                    </MenuButton>
                                                                    <Transition
                                                                        as={Fragment}
                                                                        enter="transition ease-out duration-100"
                                                                        enterFrom="transform opacity-0 scale-95"
                                                                        enterTo="transform opacity-100 scale-100"
                                                                        leave="transition ease-in duration-75"
                                                                        leaveFrom="transform opacity-100 scale-100"
                                                                        leaveTo="transform opacity-0 scale-95"
                                                                    >
                                                                        <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100 dark:border-white/10">
                                                                            <div className="py-1">
                                                                                <MenuItem>
                                                                                    {({ active }) => (
                                                                                        <button onClick={(e) => { e.stopPropagation(); onNavigateToDetail(); }} className={`${active ? 'bg-gray-50 dark:bg-white/5' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                                                                            <span className="w-4 h-4 mr-2" ><DocumentTextIcon /></span> View Details
                                                                                        </button>
                                                                                    )}
                                                                                </MenuItem>
                                                                                <MenuItem>
                                                                                    {({ active }) => (
                                                                                        <button onClick={(e) => e.stopPropagation()} className={`${active ? 'bg-gray-50 dark:bg-white/5' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                                                                            <span className="w-4 h-4 mr-2" ><PencilSquareIcon /></span> Edit
                                                                                        </button>
                                                                                    )}
                                                                                </MenuItem>
                                                                                <MenuItem>
                                                                                    {({ active }) => (
                                                                                        <button onClick={(e) => e.stopPropagation()} className={`${active ? 'bg-gray-50 dark:bg-white/5' : ''} group flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}>
                                                                                            <span className="w-4 h-4 mr-2" ><TrashIcon /></span> Delete
                                                                                        </button>
                                                                                    )}
                                                                                </MenuItem>
                                                                                <MenuItem>
                                                                                    {({ active }) => (
                                                                                        <button onClick={(e) => e.stopPropagation()} className={`${active ? 'bg-gray-50 dark:bg-white/5' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                                                                            <span className="w-4 h-4 mr-2" ><EnvelopeIcon /></span> Contact
                                                                                        </button>
                                                                                    )}
                                                                                </MenuItem>
                                                                            </div>
                                                                        </MenuItems>
                                                                    </Transition>
                                                                </Menu>
                                                            </td>
                                                        </tr>
                                                        {/* Details Row */}
                                                        {expandedIds.has(order.id) && (
                                                            <tr>
                                                                <td colSpan={6} className="px-0 py-0 border-b border-gray-200 dark:border-white/10">
                                                                    <div className="p-4 bg-gray-50 dark:bg-black/40 pl-12">
                                                                        <div className="flex items-start gap-4">
                                                                            <div className="flex-1 space-y-4">
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><UserIcon className="w-6 h-6 text-gray-500" /></div>
                                                                                    <div>
                                                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                                                                                        <p className="text-xs text-gray-500">Project Manager</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="h-px bg-gray-200 dark:bg-white/10 w-full"></div>
                                                                                {/* Progress Bar Simple */}
                                                                                <div className="relative">
                                                                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
                                                                                    <div className="relative flex justify-between">
                                                                                        {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                                            <div key={i} className={`flex flex-col items-center gap-2 ${i < 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                                                                                                <div className={`w-3 h-3 rounded-full ${i < 2 ? 'bg-blue-600 ring-4 ring-blue-50 dark:ring-blue-900/30' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                                                                                <span className="text-xs font-medium">{step}</span>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-64">
                                                                                <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                                                                                    <p className="text-xs font-medium text-gray-500 uppercase">Alert</p>
                                                                                    <div className="mt-2 flex items-start gap-2">
                                                                                        <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 flex-shrink-0" />
                                                                                        <div>
                                                                                            <p className="text-sm font-medium text-orange-700 dark:text-orange-400">Customs Delay</p>
                                                                                            <p className="text-xs text-gray-500 mt-1">Shipment held at port. ETA +24h.</p>
                                                                                            <button onClick={() => setTrackingOrder(order)} className="mt-2 text-xs font-medium text-blue-600 hover:underline">Track Shipment</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {filteredOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className={`group relative bg-white dark:bg-zinc-900 rounded-2xl border ${expandedIds.has(order.id) ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 dark:border-white/10'} shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden`}
                                                onClick={() => toggleExpand(order.id)}
                                            >
                                                <div className="p-5">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                                                                {order.initials}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{order.customer}</h4>
                                                                <p className="text-xs text-gray-500">{order.id}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button onClick={(e) => { e.stopPropagation(); onNavigateToDetail(); }} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                                <DocumentTextIcon className="h-5 w-5" />
                                                            </button>
                                                            <button onClick={(e) => e.stopPropagation()} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                                                <PencilSquareIcon className="h-5 w-5" />
                                                            </button>
                                                            <Menu as="div" className="relative inline-block text-left">
                                                                <MenuButton onClick={(e) => e.stopPropagation()} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400">
                                                                    <EllipsisHorizontalIcon className="h-5 w-5" />
                                                                </MenuButton>
                                                                <Transition
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-100"
                                                                    enterFrom="transform opacity-0 scale-95"
                                                                    enterTo="transform opacity-100 scale-100"
                                                                    leave="transition ease-in duration-75"
                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                    leaveTo="transform opacity-0 scale-95"
                                                                >
                                                                    <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-100 dark:border-white/10">
                                                                        <div className="py-1">
                                                                            <MenuItem>
                                                                                {({ active }) => (
                                                                                    <button onClick={(e) => e.stopPropagation()} className={`${active ? 'bg-gray-50 dark:bg-white/5' : ''} group flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}>
                                                                                        <span className="w-4 h-4 mr-2" ><TrashIcon /></span> Delete
                                                                                    </button>
                                                                                )}
                                                                            </MenuItem>
                                                                        </div>
                                                                    </MenuItems>
                                                                </Transition>
                                                            </Menu>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                                                            <span className="text-xs text-gray-500">Amount</span>
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{order.amount}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-white/5">
                                                            <span className="text-xs text-gray-500">Date</span>
                                                            <span className="text-sm text-gray-700 dark:text-gray-300">{order.date}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center pt-2">
                                                            <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset", order.statusColor)}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {expandedIds.has(order.id) && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                                                        <div className="flex flex-col md:flex-row gap-8">
                                                            <div className="flex-1 space-y-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500">
                                                                        <UserIcon className="h-4 w-4" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">Sarah Johnson</p>
                                                                        <p className="text-xs text-gray-500">Project Manager</p>
                                                                    </div>
                                                                </div>

                                                                <div className="relative py-2">
                                                                    <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-200 dark:bg-zinc-700" />
                                                                    <div className="relative z-10 flex justify-between">
                                                                        {['Placed', 'Mfg', 'Qual', 'Ship'].map((step, i) => (
                                                                            <div key={i} className="flex flex-col items-center bg-white dark:bg-zinc-900 px-1">
                                                                                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${i <= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-zinc-700 text-gray-400'}`}>
                                                                                    {i < 1 ? <CheckIcon className="h-4 w-4" /> : <div className={`h-2 w-2 rounded-full ${i <= 1 ? 'bg-white' : 'bg-white/50'}`} />}
                                                                                </div>
                                                                                <span className={`mt-2 text-xs font-medium ${i <= 1 ? 'text-blue-500' : 'text-gray-500'}`}>{step}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="w-full md:w-[280px]">
                                                                <div className="rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 p-4">
                                                                    <div className="flex gap-3">
                                                                        <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 shrink-0" />
                                                                        <div>
                                                                            <h5 className="text-sm font-bold text-orange-700 dark:text-orange-400">Alert: Customs Delay</h5>
                                                                            <p className="mt-1 text-xs text-orange-600/80 dark:text-orange-400/70">Held at port. ETA +24h.</p>
                                                                            <button onClick={(e) => { e.stopPropagation(); setTrackingOrder(order); }} className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                                                                Track Shipment
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}                                                {expandedIds.has(order.id) && (
                                                    <div className="bg-gray-50 dark:bg-white/5 p-4 border-t border-gray-200 dark:border-white/10">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <ShoppingBagIcon className="h-4 w-4 text-gray-400" />
                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Order Items (3)</span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {['Office Chair Ergonomic', 'Standing Desk Motorized'].map((item, i) => (
                                                                <div key={i} className="flex justify-between text-xs">
                                                                    <span className="text-gray-500">{item}</span>
                                                                    <span className="text-gray-900 dark:text-white font-medium">x1</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setTrackingOrder(order); }}
                                                            className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-md transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <MapPinIcon className="h-3 w-3" /> Track Shipment
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div >

                {/* Charts Area */}
                < div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} vertical={false} />
                                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', borderColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
                                        itemStyle={{ color: '#1F2937' }}
                                    />
                                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="costs" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inventory Breakdown</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={inventoryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} vertical={false} />
                                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: '12px', border: 'none', color: '#fff' }} />
                                    <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div >

            </div >

            <Transition appear show={!!trackingOrder} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setTrackingOrder(null)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25 dark:bg-black/80 backdrop-blur-sm" />
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
                                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all border border-zinc-200 dark:border-zinc-800">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-zinc-900 dark:text-white flex justify-between items-center mb-6"
                                    >
                                        <span>Tracking Details - {trackingOrder?.id}</span>
                                        <button
                                            onClick={() => setTrackingOrder(null)}
                                            className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </Dialog.Title>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Left Col: Timeline */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Shipment Progress</h4>
                                            <div className="space-y-6 relative pl-2 border-l border-zinc-200 dark:border-zinc-800 ml-2">
                                                {trackingSteps.map((step, idx) => (
                                                    <div key={idx} className="relative pl-6">
                                                        <div className={cn(
                                                            "absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-zinc-900",
                                                            step.completed ? "bg-zinc-900 dark:bg-white" : "bg-zinc-300 dark:bg-zinc-700",
                                                            step.alert && "bg-red-500 dark:bg-red-500"
                                                        )} />
                                                        <p className="text-sm font-medium text-zinc-900 dark:text-white">{step.status}</p>
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{step.date} · {step.location}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Col: Georefence & Actions */}
                                        <div className="flex flex-col h-full">
                                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4 uppercase tracking-wider">Delivery Location</h4>

                                            {/* Map Placeholder */}
                                            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg h-40 w-full mb-4 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                                                <div className="text-center">
                                                    <MapPinIcon className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Map Preview Unavailable</span>
                                                </div>
                                            </div>

                                            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 mb-6">
                                                <p className="text-xs font-medium text-zinc-900 dark:text-white">Distribution Center NY-05</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">45 Industrial Park Dr, Brooklyn, NY 11201</p>
                                            </div>

                                            <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800">
                                                <button
                                                    type="button"
                                                    className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-zinc-900 dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm hover:bg-zinc-700 dark:hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                                                    onClick={() => console.log('Contacting support...')}
                                                >
                                                    <EnvelopeIcon className="h-4 w-4" />
                                                    Contact Support
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div >
    )
}


