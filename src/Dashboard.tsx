import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import {
    HomeIcon, CubeIcon, ClipboardDocumentListIcon, TruckIcon,
    ArrowRightOnRectangleIcon, MagnifyingGlassIcon, BellIcon, CalendarIcon,
    CurrencyDollarIcon, ChartBarIcon, ArrowTrendingUpIcon, ExclamationCircleIcon,
    PlusIcon, DocumentDuplicateIcon, DocumentTextIcon, EnvelopeIcon, Squares2X2Icon,
    EllipsisHorizontalIcon, ListBulletIcon, SunIcon, MoonIcon,
    ChevronDownIcon, ChevronRightIcon, EyeIcon, PencilIcon, TrashIcon,
    CheckCircleIcon, MapPinIcon, UserIcon, ClockIcon
} from '@heroicons/react/24/outline'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useTheme } from './useTheme'
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
    { name: 'Jun', sales: 2390, costs: 3800 },
]

const trackingSteps = [
    { status: 'Order Placed', date: 'Dec 20, 9:00 AM', location: 'System', completed: true },
    { status: 'Processing', date: 'Dec 21, 10:30 AM', location: 'Warehouse A', completed: true },
    { status: 'Shipped', date: 'Dec 22, 4:15 PM', location: 'Logistics Center', completed: true },
    { status: 'Customs Hold', date: 'Dec 24, 11:00 AM', location: 'Port of Entry', completed: false, alert: true },
]

const recentOrders = [
    { id: "#ORD-2055", customer: "AutoManfacture Co.", amount: "$385,000", status: "Pending Review", date: "Dec 20, 2025", initials: "AC", statusColor: "bg-zinc-100 text-zinc-700" },
    { id: "#ORD-2054", customer: "TechDealer Solutions", amount: "$62,500", status: "In Production", date: "Nov 15, 2025", initials: "TS", statusColor: "bg-blue-50 text-blue-700 ring-blue-600/20" },
    { id: "#ORD-2053", customer: "Urban Living Inc.", amount: "$112,000", status: "Shipped", date: "Oct 30, 2025", initials: "UL", statusColor: "bg-green-50 text-green-700 ring-green-600/20" },
]

export default function Dashboard({ onLogout, onNavigateToDetail }: { onLogout: () => void, onNavigateToDetail: () => void }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isMainOpen, setIsMainOpen] = useState(true)
    const [isOperationsOpen, setIsOperationsOpen] = useState(true)
    const { theme, toggleTheme } = useTheme()

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
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

    const filteredOrders = useMemo(() => {
        return recentOrders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status)
            return matchesSearch && matchesStatus
        })
    }, [searchQuery, selectedStatuses])

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="h-8 flex items-center">
                        <img src="/logo-on-light.jpg" alt="Strata" className="h-full w-auto block dark:hidden" />
                        <img src="/logo-on-dark.jpg" alt="Strata" className="h-full w-auto hidden dark:block" />
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {/* Main Category */}
                    <div className="space-y-1">
                        <button
                            type="button"
                            onClick={() => setIsMainOpen(!isMainOpen)}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <span>Main</span>
                            {isMainOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                        </button>
                        {isMainOpen && (
                            <div className="space-y-1 px-2">
                                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                                    <HomeIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                                    Overview
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Operations Category */}
                    <div className="space-y-1">
                        <button
                            type="button"
                            onClick={() => setIsOperationsOpen(!isOperationsOpen)}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            <span>Operations</span>
                            {isOperationsOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                        </button>
                        {isOperationsOpen && (
                            <div className="space-y-1 px-2">
                                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <CubeIcon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                                    Inventory
                                </a>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <ArrowTrendingUpIcon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                                    Production
                                </a>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <ClipboardDocumentListIcon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                                    Orders
                                </a>
                                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <TruckIcon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                                    Logistics
                                </a>
                            </div>
                        )}
                    </div>
                </nav>
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-300">JD</div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium leading-none truncate text-zinc-900 dark:text-zinc-100">Jhon Doe</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">Admin</p>
                        </div>
                        <button onClick={onLogout} className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300">
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8">
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <span>Dashboard</span>
                        <span className="text-zinc-300 dark:text-zinc-700">/</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium">Operational Overview</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                            <input type="text" placeholder="Search..." className="pl-9 h-9 w-full rounded-md border-0 bg-zinc-50 dark:bg-zinc-800 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:focus:ring-white text-sm dark:text-white dark:placeholder-zinc-500" />
                        </div>
                        <button className="flex items-center gap-2 h-9 px-3 rounded-md border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                            <CalendarIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                            Jan 1 - Jan 31, 2025
                        </button>
                        <button className="relative p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300">
                            <BellIcon className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-zinc-900"></span>
                        </button>
                        <button onClick={toggleTheme} className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-auto p-8 space-y-8">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Inventory Value', value: '$1.2M', change: '+0.2% vs last month', positive: true, icon: CurrencyDollarIcon },
                            { label: 'Production Efficiency', value: '88%', change: '+3.5% vs last month', positive: true, icon: ChartBarIcon },
                            { label: 'Pending Orders', value: '142', change: '-12 vs yesterday', neutral: true, icon: ClipboardDocumentListIcon },
                            { label: 'Low Stock Alerts', value: '15', change: 'Requires attention', negative: true, icon: ExclamationCircleIcon },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10">
                                <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">{stat.label}</dt>
                                <dd className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">{stat.value}</dd>
                                <div className={cn("text-xs flex items-center gap-1 font-medium",
                                    stat.positive ? "text-green-600 dark:text-green-400" : stat.negative ? "text-red-600 dark:text-red-400" : "text-zinc-500 dark:text-zinc-400"
                                )}>
                                    {stat.positive && <ArrowTrendingUpIcon className="h-3 w-3" />}
                                    {stat.negative && <ExclamationCircleIcon className="h-3 w-3" />}
                                    {stat.change}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { label: 'New Order', icon: PlusIcon, bg: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' },
                                { label: 'Duplicate', icon: DocumentDuplicateIcon, color: 'text-zinc-500 dark:text-zinc-400' },
                                { label: 'Export PDF', icon: DocumentTextIcon, color: 'text-zinc-500 dark:text-zinc-400' },
                                { label: 'Send Email', icon: EnvelopeIcon, color: 'text-zinc-500 dark:text-zinc-400' },
                                { label: 'Templates', icon: Squares2X2Icon, color: 'text-zinc-500 dark:text-zinc-400' },
                            ].map((action, i) => (
                                <button key={i} className="h-24 flex flex-col justify-center items-center gap-3 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 transition-all">
                                    <div className={cn("p-1.5 rounded-md", action.bg || "bg-zinc-100 dark:bg-zinc-800")}>
                                        <action.icon className={cn("h-5 w-5", action.color || "text-white dark:text-white")} />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Charts & Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Orders Table */}
                        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10">
                            <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Recent Orders</h3>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                                        <input
                                            type="text"
                                            placeholder="Search orders..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 h-9 w-64 rounded-md border-0 bg-zinc-50 dark:bg-zinc-800 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:focus:ring-white text-sm dark:text-white dark:placeholder-zinc-500"
                                        />
                                    </div>
                                    <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 gap-1">
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={cn("p-1 rounded-md transition-all", viewMode === 'list' ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200")}
                                        >
                                            <ListBulletIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={cn("p-1 rounded-md transition-all", viewMode === 'grid' ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200")}
                                        >
                                            <Squares2X2Icon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700"></div>
                                    <Menu as="div" className="relative">
                                        <MenuButton className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700">
                                            Status
                                            <ChevronDownIcon className="h-3 w-3" />
                                        </MenuButton>
                                        <MenuItems className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
                                            {['Pending Review', 'In Production', 'Shipped'].map((status) => (
                                                <MenuItem key={status}>
                                                    {({ active }) => (
                                                        <label className={cn("flex items-center gap-2 px-3 py-2 text-xs cursor-pointer rounded-md", active ? 'bg-zinc-50 dark:bg-zinc-700' : '')}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedStatuses.includes(status)}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedStatuses([...selectedStatuses, status])
                                                                    } else {
                                                                        setSelectedStatuses(selectedStatuses.filter(s => s !== status))
                                                                    }
                                                                }}
                                                                className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:bg-zinc-900 dark:border-zinc-600 dark:checked:bg-white dark:focus:ring-white"
                                                            />
                                                            <span className="text-zinc-900 dark:text-zinc-100">{status}</span>
                                                        </label>
                                                    )}
                                                </MenuItem>
                                            ))}
                                            <div className="border-t border-zinc-100 dark:border-zinc-700 mt-1 pt-1">
                                                <MenuItem>
                                                    <button
                                                        onClick={() => setSelectedStatuses([])}
                                                        className="w-full text-left px-3 py-2 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                                    >
                                                        Clear Filter
                                                    </button>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            {viewMode === 'list' ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                                        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Order ID</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Customer</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Amount</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Due Date</th>
                                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
                                            {filteredOrders.map((order) => (
                                                <>
                                                    <tr
                                                        key={order.id}
                                                        onClick={() => toggleExpand(order.id)}
                                                        className={cn(
                                                            "cursor-pointer transition-colors border-b border-zinc-100 dark:border-zinc-800/50",
                                                            expandedIds.has(order.id) ? "bg-zinc-50 dark:bg-zinc-800/50" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                                        )}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                                                            {expandedIds.has(order.id) ? <ChevronDownIcon className="h-4 w-4 text-zinc-400" /> : <ChevronRightIcon className="h-4 w-4 text-zinc-400" />}
                                                            {order.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300">{order.initials}</div>
                                                                <div className="text-sm text-zinc-900 dark:text-zinc-100">{order.customer}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">{order.amount}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", order.statusColor)}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">{order.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                                                            <Menu as="div" className="relative inline-block text-left">
                                                                <MenuButton className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                    <EllipsisHorizontalIcon className="h-5 w-5" />
                                                                </MenuButton>
                                                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
                                                                    <MenuItem>
                                                                        <button onClick={onNavigateToDetail} className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                            <EyeIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                            View Details
                                                                        </button>
                                                                    </MenuItem>
                                                                    <MenuItem>
                                                                        <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                            <PencilIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                            Edit
                                                                        </button>
                                                                    </MenuItem>
                                                                    <MenuItem>
                                                                        <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                            <TrashIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                            Delete
                                                                        </button>
                                                                    </MenuItem>
                                                                    <MenuItem>
                                                                        <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                            <EnvelopeIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                            Contact
                                                                        </button>
                                                                    </MenuItem>
                                                                </MenuItems>
                                                            </Menu>
                                                        </td>
                                                    </tr>
                                                    {expandedIds.has(order.id) && (
                                                        <tr className="bg-zinc-50/50 dark:bg-zinc-800/30">
                                                            <td colSpan={6} className="px-6 py-4">
                                                                <div className="space-y-6">
                                                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                                                        <div className="flex items-start gap-3">
                                                                            <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                                                                                <UserIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-medium text-zinc-900 dark:text-white">Sarah Johnson</p>
                                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Project Manager</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-8">
                                                                            <div>
                                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">LOCATION</p>
                                                                                <div className="flex items-center gap-1.5 text-sm text-zinc-900 dark:text-white">
                                                                                    <MapPinIcon className="h-4 w-4 text-zinc-400" />
                                                                                    New York, NY
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">PROJECT ID</p>
                                                                                <p className="text-sm text-zinc-900 dark:text-white">PRJ-2024-0087</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="relative pt-2 pb-6">
                                                                        <div className="absolute top-[15px] left-0 w-full h-[2px] bg-zinc-200 dark:bg-zinc-700" />
                                                                        <div className="relative z-10 flex justify-between">
                                                                            {['Order Placed', 'Manufacturing', 'Quality Check', 'Shipping'].map((step, i) => (
                                                                                <div key={i} className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900 px-2 rounded-full">
                                                                                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center ring-1 ring-inset transition-colors", i <= 1 ? 'bg-zinc-900 dark:bg-zinc-50 ring-zinc-900 dark:ring-zinc-50 text-white dark:text-zinc-900' : 'bg-white dark:bg-zinc-900 ring-zinc-300 dark:ring-zinc-600 text-zinc-300 dark:text-zinc-600')}>
                                                                                        {i < 1 ? <CheckCircleIcon className="h-5 w-5" /> : i === 1 ? <ClockIcon className="h-5 w-5" /> : <div className="h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />}
                                                                                    </div>
                                                                                    <span className="text-[10px] mt-1 font-medium text-zinc-600 dark:text-zinc-400">{step}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                                                        <TruckIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                                                                        <div>
                                                                            <p className="text-sm font-medium text-zinc-900 dark:text-white">Truck delayed at Customs - New ETA +24h</p>
                                                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">The delivery truck has been delayed at the export checkpoint. Estimated arrival updated.</p>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => setTrackingOrder(order)}
                                                                            className="ml-auto text-xs px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-md font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
                                                                        >
                                                                            Track
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ))}
                                            {filteredOrders.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                                        No orders found matching your criteria.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                                    {filteredOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className={cn(
                                                "rounded-lg border transition-all cursor-pointer",
                                                expandedIds.has(order.id)
                                                    ? "border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30"
                                                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                            )}
                                            onClick={() => toggleExpand(order.id)}
                                        >
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-semibold text-zinc-900 dark:text-white">{order.id}</div>
                                                            {expandedIds.has(order.id) ? <ChevronDownIcon className="h-4 w-4 text-zinc-400" /> : <ChevronRightIcon className="h-4 w-4 text-zinc-400" />}
                                                        </div>
                                                        <div className="text-sm text-zinc-500 dark:text-zinc-400">{order.customer}</div>
                                                    </div>
                                                    <div onClick={(e) => e.stopPropagation()}>
                                                        <Menu as="div" className="relative text-left">
                                                            <MenuButton className="p-1 -mr-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                <EllipsisHorizontalIcon className="h-5 w-5" />
                                                            </MenuButton>
                                                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
                                                                <MenuItem>
                                                                    <button onClick={onNavigateToDetail} className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                        <EyeIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                        View Details
                                                                    </button>
                                                                </MenuItem>
                                                                <MenuItem>
                                                                    <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                        <PencilIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                        Edit
                                                                    </button>
                                                                </MenuItem>
                                                                <MenuItem>
                                                                    <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                        <TrashIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                        Delete
                                                                    </button>
                                                                </MenuItem>
                                                                <MenuItem>
                                                                    <button className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                                        <EnvelopeIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
                                                                        Contact
                                                                    </button>
                                                                </MenuItem>
                                                            </MenuItems>
                                                        </Menu>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-zinc-500 dark:text-zinc-400">Amount</span>
                                                        <span className="font-medium text-zinc-900 dark:text-white">{order.amount}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-zinc-500 dark:text-zinc-400">Due Date</span>
                                                        <span className="text-zinc-900 dark:text-white">{order.date}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                                        <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", order.statusColor)}>
                                                            {order.status}
                                                        </span>
                                                        <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-600 dark:text-zinc-300">{order.initials}</div>
                                                    </div>
                                                </div>
                                                {expandedIds.has(order.id) && (
                                                    <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4 cursor-default" onClick={(e) => e.stopPropagation()}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                                                                <UserIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-zinc-900 dark:text-white">Sarah Johnson</p>
                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Project Manager</p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">LOCATION</p>
                                                                <div className="flex items-center gap-1.5 text-sm text-zinc-900 dark:text-white">
                                                                    <MapPinIcon className="h-4 w-4 text-zinc-400" />
                                                                    NY, USA
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">PROJECT ID</p>
                                                                <p className="text-sm text-zinc-900 dark:text-white">PRJ-24-87</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2 bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg">
                                                            {['Order Placed', 'Manufacturing', 'Quality', 'Shipping'].map((step, i) => (
                                                                <div key={i} className="flex items-center gap-3">
                                                                    <div className={cn("h-2 w-2 rounded-full ring-2 ring-white dark:ring-zinc-800", i <= 1 ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-300 dark:bg-zinc-600")} />
                                                                    <span className={cn("text-xs", i <= 1 ? "text-zinc-900 dark:text-zinc-100 font-medium" : "text-zinc-500 dark:text-zinc-500")}>{step}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800 flex gap-2 items-center">
                                                            <TruckIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                                                            <div className="flex-1">
                                                                <p className="text-xs font-medium text-zinc-900 dark:text-white">Delay: Customs</p>
                                                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">+24h ETA</p>
                                                            </div>
                                                            <button
                                                                onClick={() => setTrackingOrder(order)}
                                                                className="text-[10px] px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 font-medium"
                                                            >
                                                                Track
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {filteredOrders.length === 0 && (
                                        <div className="col-span-full py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                            No orders found matching your criteria.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-3">
                            {[
                                { label: 'Total Revenue', value: '$2,847,500', icon: ArrowTrendingUpIcon },
                                { label: 'Operational Costs', value: '$1,625,000', icon: ChartBarIcon },
                                { label: 'Net Profit', value: '$1,222,500', icon: CurrencyDollarIcon },
                            ].map((metric, i) => (
                                <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{metric.label}</p>
                                        <p className="text-xl font-bold text-zinc-900 dark:text-white mt-1">{metric.value}</p>
                                    </div>
                                    <metric.icon className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                                </div>
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 p-6">
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-6">Inventory Turnover by Category</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={inventoryData}>
                                        <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="value" fill="#18181b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-xl shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10 p-6">
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-6">Sales vs. Material Costs</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={salesData}>
                                        <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Line type="monotone" dataKey="sales" stroke="#18181b" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="costs" stroke="#a1a1aa" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

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
        </div>
    )
}
