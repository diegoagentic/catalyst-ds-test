import { Menu, MenuButton, MenuItem, MenuItems, Transition, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Fragment } from 'react'
import {
    HomeIcon, CubeIcon, ClipboardDocumentListIcon, ArrowTrendingUpIcon,
    Squares2X2Icon, SunIcon, MoonIcon, ChevronDownIcon,
    UserIcon, DocumentTextIcon, ChartBarIcon, ExclamationCircleIcon,
    CalendarIcon, EllipsisHorizontalIcon, ArrowRightOnRectangleIcon, BriefcaseIcon, CheckIcon
} from '@heroicons/react/24/outline'
import { useTheme } from '../useTheme'
import { useTenant } from '../TenantContext'

import ActionCenter from './notifications/ActionCenter';

import logoLightBrand from '../assets/logo-light-brand.png';
import logoDarkBrand from '../assets/logo-dark-brand.png';

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`relative flex items-center justify-center h-9 px-3 rounded-full transition-all duration-300 group overflow-hidden ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}>
            <span className="relative z-10">{icon}</span>
            <span className={`ml-2 text-sm font-medium whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-in-out ${active ? 'max-w-xs opacity-100' : ''}`}>
                {label}
            </span>
        </button>
    )
}

interface NavbarProps {
    onLogout: () => void;
    activeTab?: 'Overview' | 'Inventory' | 'Production' | 'Orders';
    onNavigateToWorkspace: () => void;
}

export default function Navbar({ onLogout, activeTab = 'Overview', onNavigateToWorkspace }: NavbarProps) {
    const { theme, toggleTheme } = useTheme()
    const { currentTenant, tenants, setTenant } = useTenant()

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center px-6 py-2 rounded-full gap-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-border shadow-lg dark:shadow-glow-md">

                {/* Logo */}
                <div className="px-4">
                    <img src={logoLightBrand} alt="Strata" className="h-8 w-32 object-contain block dark:hidden" />
                    <img src={logoDarkBrand} alt="Strata" className="h-8 w-32 object-contain hidden dark:block" />
                </div>


                <div className="h-6 w-px bg-border mx-1"></div>

                {/* Tenant Selector */}
                <Menu as="div" className="relative mr-2">
                    <MenuButton className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors outline-none">
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider leading-none">Tenant</span>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-foreground leading-tight">{currentTenant}</span>
                                <ChevronDownIcon className="w-3 h-3 text-muted-foreground" />
                            </div>
                        </div>
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
                        <MenuItems className="absolute left-0 top-full mt-2 w-48 origin-top-left rounded-xl bg-popover shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none border border-border p-1 z-50">
                            {tenants.map((tenant) => (
                                <MenuItem key={tenant}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setTenant(tenant)}
                                            className={`${active ? 'bg-muted' : ''} group flex w-full items-center px-4 py-2 text-sm text-foreground rounded-lg transition-colors`}
                                        >
                                            {tenant}
                                            {currentTenant === tenant && <CheckIcon className="ml-auto w-4 h-4 text-foreground" />}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </MenuItems>
                    </Transition>
                </Menu>

                {/* Navigation Items */}
                <div className="flex items-center gap-1">
                    <NavItem icon={<HomeIcon className="w-4 h-4" />} label="Overview" active={activeTab === 'Overview'} />
                    <NavItem icon={<CubeIcon className="w-4 h-4" />} label="Inventory" active={activeTab === 'Inventory'} />
                    <NavItem icon={<ArrowTrendingUpIcon className="w-4 h-4" />} label="Production" active={activeTab === 'Production'} />
                    <NavItem icon={<ClipboardDocumentListIcon className="w-4 h-4" />} label="Orders" active={activeTab === 'Orders'} />
                </div>

                <div className="h-6 w-px bg-border mx-1"></div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 pr-2">
                    {/* Action Center - New Feature */}
                    <ActionCenter />

                    <div className="h-4 w-px bg-border mx-1"></div>

                    <Popover className="relative">
                        <PopoverButton className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none">
                            <Squares2X2Icon className="w-5 h-5" />
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
                            <PopoverPanel className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[400px] p-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-border shadow-2xl rounded-3xl z-[100] overflow-hidden">
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { icon: <BriefcaseIcon className="w-8 h-8" />, label: "My Work Space", color: "text-primary", bg: "bg-primary/10", isHighlighted: true, onClick: onNavigateToWorkspace },
                                        { icon: <HomeIcon className="w-8 h-8" />, label: "Portal", color: "text-primary", bg: "bg-primary/10" },
                                        { icon: <UserIcon className="w-8 h-8" />, label: "CRM", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
                                        { icon: <DocumentTextIcon className="w-8 h-8" />, label: "Invoice", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10" },
                                        { icon: <CubeIcon className="w-8 h-8" />, label: "Inventory", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10" },
                                        { icon: <ChartBarIcon className="w-8 h-8" />, label: "Analytics", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-500/10" },
                                        { icon: <ExclamationCircleIcon className="w-8 h-8" />, label: "Support", color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
                                        { icon: <Squares2X2Icon className="w-8 h-8" />, label: "Board", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                                        { icon: <CalendarIcon className="w-8 h-8" />, label: "Calendar", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-500/10" },
                                        { icon: <EllipsisHorizontalIcon className="w-8 h-8" />, label: "More", color: "text-gray-600 dark:text-gray-400", bg: "bg-muted" },
                                    ].map((app, i) => (
                                        <button
                                            key={i}
                                            // @ts-ignore
                                            onClick={app.onClick}
                                            className={`flex flex-col items-center gap-3 p-3 rounded-2xl hover:bg-primary/5 hover:ring-1 hover:ring-primary/20 transition-all group ${
                                                // @ts-ignore
                                                app.isHighlighted ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                                                }`}>
                                            <div className={`p-3 rounded-2xl ${app.bg} ${app.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                                {app.icon}
                                            </div>
                                            <span className={`text-xs font-semibold group-hover:text-foreground ${
                                                // @ts-ignore
                                                app.isHighlighted ? 'text-foreground' : 'text-muted-foreground'
                                                }`}>{app.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </Popover>

                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                    </button>

                    <div className="relative group">
                        <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-muted transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0">
                                JD
                            </div>
                            <div className="text-left hidden md:block">
                                <p className="text-xs font-semibold text-foreground group-hover:text-foreground">Jhon Doe</p>
                                <p className="text-[10px] text-muted-foreground">Admin</p>
                            </div>
                            <ChevronDownIcon className="w-3 h-3 text-muted-foreground" />
                        </button>
                        {/* User Dropdown */}
                        <div className="absolute top-full right-0 mt-2 w-48 py-1 rounded-xl bg-popover/90 backdrop-blur-xl border border-border shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                            <div className="px-4 py-2 border-b border-border">
                                <p className="text-sm font-medium">Jhon Doe</p>
                                <p className="text-xs text-muted-foreground">Admin</p>
                            </div>
                            <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center gap-2">
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
