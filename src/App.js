import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Calendar, 
  Clock, 
  Users, 
  Package, 
  DollarSign, 
  MessageSquare, 
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Scissors,
  Palette,
  Sparkles
} from 'lucide-react';

const App = () => {
  // Estados principales
  const [activeTab, setActiveTab] = useState('agenda');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProfessional, setFilterProfessional] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Datos simulados - En producción vendrían de una API/base de datos
  const [profesionales] = useState([
    { id: 1, nombre: 'María González', especialidad: 'Estilista Senior', color: '#FF6B6B', activo: true },
    { id: 2, nombre: 'Carlos Ruiz', especialidad: 'Estilista', color: '#4ECDC4', activo: true },
    { id: 3, nombre: 'Ana López', especialidad: 'Estilista', color: '#45B7D1', activo: true },
    { id: 4, nombre: 'Sofía Martín', especialidad: 'Colorista/Recepción', color: '#96CEB4', activo: true }
  ]);

  const [servicios] = useState([
    { id: 1, nombre: 'Corte Mujer', precio: 25000, duracion: 45, categoria: 'Corte' },
    { id: 2, nombre: 'Corte Hombre', precio: 18000, duracion: 30, categoria: 'Corte' },
    { id: 3, nombre: 'Peinado', precio: 30000, duracion: 60, categoria: 'Peinado' },
    { id: 4, nombre: 'Tinte', precio: 45000, duracion: 120, categoria: 'Color' },
    { id: 5, nombre: 'Mechas', precio: 55000, duracion: 180, categoria: 'Color' },
    { id: 6, nombre: 'Tratamiento Capilar', precio: 35000, duracion: 90, categoria: 'Tratamiento' },
    { id: 7, nombre: 'Manicure', precio: 15000, duracion: 45, categoria: 'Uñas' },
    { id: 8, nombre: 'Pedicure', precio: 18000, duracion: 60, categoria: 'Uñas' }
  ]);

  const [citas, setCitas] = useState([
    {
      id: 1,
      clienteId: 1,
      profesionalId: 1,
      servicioId: 1,
      fecha: '2025-08-04',
      hora: '10:00',
      estado: 'confirmada',
      notas: 'Primera vez en el salón'
    },
    {
      id: 2,
      clienteId: 2,
      profesionalId: 2,
      fecha: '2025-08-04',
      hora: '14:30',
      servicioId: 4,
      estado: 'pendiente',
      notas: 'Cambio de look radical'
    },
    {
      id: 3,
      clienteId: 3,
      profesionalId: 1,
      fecha: '2025-08-04',
      hora: '16:00',
      servicioId: 3,
      estado: 'confirmada',
      notas: 'Evento especial'
    }
  ]);

  const [clientes] = useState([
    {
      id: 1,
      nombre: 'Laura Pérez',
      telefono: '+56912345678',
      email: 'laura@email.com',
      fechaRegistro: '2024-01-15',
      ultimaVisita: '2025-07-20',
      totalGastado: 180000,
      vip: true
    },
    {
      id: 2,
      nombre: 'Roberto Silva',
      telefono: '+56987654321',
      email: 'roberto@email.com',
      fechaRegistro: '2024-03-10',
      ultimaVisita: '2025-07-28',
      totalGastado: 85000,
      vip: false
    },
    {
      id: 3,
      nombre: 'Carmen Torres',
      telefono: '+56955555555',
      email: 'carmen@email.com',
      fechaRegistro: '2023-12-05',
      ultimaVisita: '2025-08-01',
      totalGastado: 320000,
      vip: true
    }
  ]);

  const [inventario, setInventario] = useState([
    { id: 1, nombre: 'Shampoo Reparador', categoria: 'Cuidado Capilar', stock: 15, stockMinimo: 5, precio: 12000 },
    { id: 2, nombre: 'Acondicionador', categoria: 'Cuidado Capilar', stock: 8, stockMinimo: 5, precio: 13000 },
    { id: 3, nombre: 'Tinte Chocolate', categoria: 'Coloración', stock: 3, stockMinimo: 5, precio: 8500 },
    { id: 4, nombre: 'Tijeras Profesionales', categoria: 'Herramientas', stock: 12, stockMinimo: 3, precio: 45000 },
    { id: 5, nombre: 'Esmalte Rojo', categoria: 'Uñas', stock: 20, stockMinimo: 8, precio: 3500 }
  ]);

  // Funciones auxiliares
  const getProfesionalNombre = (id) => {
    const prof = profesionales.find(p => p.id === id);
    return prof ? prof.nombre : 'No asignado';
  };

  const getServicioNombre = (id) => {
    const serv = servicios.find(s => s.id === id);
    return serv ? serv.nombre : 'Sin servicio';
  };

  const getClienteNombre = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nombre : 'Cliente no encontrado';
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'confirmada': return 'text-green-600 bg-green-100';
      case 'pendiente': return 'text-yellow-600 bg-yellow-100';
      case 'cancelada': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatPrice = (price) => {
    return `$${price.toLocaleString('es-CL')}`;
  };

  // Filtrar citas
  const citasFiltradas = citas.filter(cita => {
    const cliente = clientes.find(c => c.id === cita.clienteId);
    const profesional = profesionales.find(p => p.id === cita.profesionalId);
    const servicio = servicios.find(s => s.id === cita.servicioId);

    const matchDate = cita.fecha === selectedDate;
    const matchSearch = searchTerm === '' || 
      cliente?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profesional?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio?.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchProfessional = filterProfessional === 'all' || cita.profesionalId === parseInt(filterProfessional);
    const matchStatus = filterStatus === 'all' || cita.estado === filterStatus;

    return matchDate && matchSearch && matchProfessional && matchStatus;
  });

  // Componente para las estadísticas
  const StatsCard = ({ title, value, icon: Icon, color = 'blue', change }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{borderLeftColor: color === 'blue' ? '#3B82F6' : color === 'green' ? '#10B981' : color === 'yellow' ? '#F59E0B' : '#EF4444'}}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% vs mes anterior
            </p>
          )}
        </div>
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </div>
  );

  // Render principal
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scissors className="h-8 w-8 text-pink-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Nuevos Aires Huecuraba</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <img className="h-8 w-8 rounded-full" src="https://ui-avatars.com/api/?name=Admin&background=ec4899&color=fff" alt="Admin" />
                <span className="text-sm font-medium text-gray-700">Administrador</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <nav className="flex space-x-8 mb-8">
          {[
            { id: 'agenda', name: 'Agenda', icon: Calendar },
            { id: 'clientes', name: 'Clientes', icon: Users },
            { id: 'inventario', name: 'Inventario', icon: Package },
            { id: 'finanzas', name: 'Finanzas', icon: DollarSign },
            { id: 'marketing', name: 'Marketing', icon: MessageSquare },
            { id: 'configuracion', name: 'Configuración', icon: Settings }
          ].map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-pink-100 text-pink-700 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {name}
            </button>
          ))}
        </nav>

        {/* Contenido por pestañas */}
        {activeTab === 'agenda' && (
          <div className="space-y-6">
            {/* Controles de la agenda */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profesional</label>
                    <select
                      value={filterProfessional}
                      onChange={(e) => setFilterProfessional(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    >
                      <option value="all">Todos</option>
                      {profesionales.map(prof => (
                        <option key={prof.id} value={prof.id}>{prof.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    >
                      <option value="all">Todos</option>
                      <option value="confirmada">Confirmada</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Cita
                  </button>
                </div>
              </div>
            </div>

            {/* Estadísticas del día */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard title="Citas Hoy" value={citasFiltradas.length} icon={Calendar} color="blue" />
              <StatsCard title="Confirmadas" value={citasFiltradas.filter(c => c.estado === 'confirmada').length} icon={CheckCircle} color="green" />
              <StatsCard title="Pendientes" value={citasFiltradas.filter(c => c.estado === 'pendiente').length} icon={AlertCircle} color="yellow" />
              <StatsCard title="Canceladas" value={citasFiltradas.filter(c => c.estado === 'cancelada').length} icon={XCircle} color="red" />
            </div>

            {/* Lista de citas */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Citas del día</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profesional</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {citasFiltradas.map((cita) => (
                      <tr key={cita.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {cita.hora}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getClienteNombre(cita.clienteId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getProfesionalNombre(cita.profesionalId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getServicioNombre(cita.servicioId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(cita.estado)}`}>
                            {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clientes' && (
          <div className="space-y-6">
            {/* Header de clientes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Clientes</h2>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Cliente
                </button>
              </div>
            </div>

            {/* Estadísticas de clientes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard title="Total Clientes" value={clientes.length} icon={Users} color="blue" change={15} />
              <StatsCard title="Clientes VIP" value={clientes.filter(c => c.vip).length} icon={Sparkles} color="yellow" change={8} />
              <StatsCard title="Nuevos (Mes)" value="12" icon={TrendingUp} color="green" change={20} />
              <StatsCard title="Inactivos" value="3" icon={AlertCircle} color="red" change={-5} />
            </div>

            {/* Lista de clientes */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Base de Clientes</h3>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Visita</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Gastado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clientes.map((cliente) => (
                      <tr key={cliente.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(cliente.nombre)}&background=ec4899&color=fff`} alt="" />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                              <div className="text-sm text-gray-500">Cliente desde {new Date(cliente.fechaRegistro).toLocaleDateString('es-CL')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              {cliente.telefono}
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              {cliente.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(cliente.ultimaVisita).toLocaleDateString('es-CL')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          {formatPrice(cliente.totalGastado)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {cliente.vip ? (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              <Sparkles className="h-3 w-3 mr-1" />
                              VIP
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              Regular
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventario' && (
          <div className="space-y-6">
            {/* Header de inventario */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Control de Inventario</h2>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Producto
                </button>
              </div>
            </div>

            {/* Estadísticas de inventario */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard title="Total Productos" value={inventario.length} icon={Package} color="blue" />
              <StatsCard title="Stock Bajo" value={inventario.filter(item => item.stock <= item.stockMinimo).length} icon={AlertCircle} color="red" />
              <StatsCard title="Valor Inventario" value={formatPrice(inventario.reduce((sum, item) => sum + (item.stock * item.precio), 0))} icon={DollarSign} color="green" />
              <StatsCard title="Categorías" value={[...new Set(inventario.map(item => item.categoria))].length} icon={BarChart3} color="yellow" />
            </div>

            {/* Lista de inventario */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Productos en Stock</h3>
                  <div className="flex items-center space-x-4">
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500">
                      <option value="all">Todas las categorías</option>
                      <option value="cuidado">Cuidado Capilar</option>
                      <option value="coloracion">Coloración</option>
                      <option value="herramientas">Herramientas</option>
                      <option value="unas">Uñas</option>
                    </select>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actual</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Mínimo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventario.map((producto) => (
                      <tr key={producto.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Package className="h-8 w-8 text-gray-400 mr-3" />
                            <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {producto.categoria}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          {producto.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {producto.stockMinimo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          {formatPrice(producto.precio)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {producto.stock <= producto.stockMinimo ? (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Stock Bajo
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              OK
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finanzas' && (
          <div className="space-y-6">
            {/* Header de finanzas */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900">Panel Financiero</h2>
            </div>

            {/* Estadísticas financieras */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard title="Ingresos Hoy" value="$185.000" icon={DollarSign} color="green" change={12} />
              <StatsCard title="Ingresos Mes" value="$3.750.000" icon={TrendingUp} color="blue" change={8} />
              <StatsCard title="Comisiones" value="$450.000" icon={Users} color="yellow" change={-2} />
              <StatsCard title="Servicios Hoy" value="12" icon={Scissors} color="purple" change={15} />
            </div>

            {/* Gráficos y reportes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ingresos por profesional */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ingresos por Profesional (Mes)</h3>
                <div className="space-y-4">
                  {profesionales.map((prof, index) => {
                    const ingresos = [1250000, 980000, 1100000, 850000][index];
                    const percentage = (ingresos / 1250000) * 100;
                    return (
                      <div key={prof.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{prof.nombre}</span>
                          <span className="text-gray-600">{formatPrice(ingresos)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{backgroundColor: prof.color, width: `${percentage}%`}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Servicios más populares */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Servicios Más Populares</h3>
                <div className="space-y-3">
                  {[
                    { servicio: 'Corte Mujer', cantidad: 45, ingresos: 1125000 },
                    { servicio: 'Tinte', cantidad: 28, ingresos: 1260000 },
                    { servicio: 'Corte Hombre', cantidad: 52, ingresos: 936000 },
                    { servicio: 'Peinado', cantidad: 15, ingresos: 450000 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{item.servicio}</div>
                        <div className="text-sm text-gray-600">{item.cantidad} servicios</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{formatPrice(item.ingresos)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen financiero */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen Mensual</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$3.750.000</div>
                  <div className="text-sm text-gray-600">Ingresos Brutos</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">$450.000</div>
                  <div className="text-sm text-gray-600">Comisiones</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$3.300.000</div>
                  <div className="text-sm text-gray-600">Ingresos Netos</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="space-y-6">
            {/* Header de marketing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900">Marketing Automatizado</h2>
            </div>

            {/* Estadísticas de marketing */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatsCard title="Campañas Activas" value="3" icon={MessageSquare} color="blue" />
              <StatsCard title="Mensajes Enviados" value="127" icon={Bell} color="green" change={25} />
              <StatsCard title="Tasa Conversión" value="15.2%" icon={TrendingUp} color="yellow" change={3} />
              <StatsCard title="Clientes Recuperados" value="8" icon={Users} color="purple" change={60} />
            </div>

            {/* Campañas de marketing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campañas automáticas */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Campañas Automáticas</h3>
                <div className="space-y-4">
                  {[
                    { 
                      nombre: 'Recordatorio de Cita', 
                      estado: 'activa', 
                      envios: 15, 
                      descripcion: 'Recordatorio 24h antes'
                    },
                    { 
                      nombre: 'Clientes Inactivos', 
                      estado: 'activa', 
                      envios: 8, 
                      descripcion: 'Sin visita por 60 días'
                    },
                    { 
                      nombre: 'Cumpleaños VIP', 
                      estado: 'pausada', 
                      envios: 3, 
                      descripcion: 'Descuento especial'
                    }
                  ].map((campana, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{campana.nombre}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          campana.estado === 'activa' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {campana.estado}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{campana.descripcion}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{campana.envios} mensajes este mes</span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-sm">Editar</button>
                          <button className="text-gray-600 hover:text-gray-900 text-sm">
                            {campana.estado === 'activa' ? 'Pausar' : 'Activar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors">
                  Nueva Campaña
                </button>
              </div>

              {/* Mensajes rápidos */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mensajes Rápidos</h3>
                <div className="space-y-3">
                  {[
                    'Confirmar cita de mañana',
                    'Promoción fin de semana',
                    'Recordatorio tratamiento',
                    'Invitación evento especial'
                  ].map((mensaje, index) => (
                    <button 
                      key={index}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">{mensaje}</span>
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Envío Masivo</h4>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    rows="3"
                    placeholder="Escribe tu mensaje personalizado..."
                  ></textarea>
                  <div className="flex justify-between items-center mt-3">
                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>Todos los clientes</option>
                      <option>Solo VIP</option>
                      <option>Clientes activos</option>
                      <option>Clientes inactivos</option>
                    </select>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                      Enviar a WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'configuracion' && (
          <div className="space-y-6">
            {/* Header de configuración */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900">Configuración del Sistema</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Información del salón */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Salón</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Salón</label>
                    <input 
                      type="text" 
                      value="Nuevos Aires Huecuraba"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <input 
                      type="text" 
                      value="Av. Pedro Fontova 6651, local 27"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="text" 
                      value="+56 9 1234 5678"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value="contacto@nuevosaireshuechuraba.com"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Gestión de profesionales */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profesionales</h3>
                <div className="space-y-3">
                  {profesionales.map((prof) => (
                    <div key={prof.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3" 
                          style={{backgroundColor: prof.color}}
                        ></div>
                        <div>
                          <div className="font-medium text-gray-900">{prof.nombre}</div>
                          <div className="text-sm text-gray-600">{prof.especialidad}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors">
                  Agregar Profesional
                </button>
              </div>

              {/* Horarios de trabajo */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Horarios de Trabajo</h3>
                <div className="space-y-3">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia) => (
                    <div key={dia} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 w-20">{dia}</span>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="time" 
                          defaultValue={dia === 'Domingo' ? '' : '09:00'}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          disabled={dia === 'Domingo'}
                        />
                        <span className="text-gray-500">-</span>
                        <input 
                          type="time" 
                          defaultValue={dia === 'Domingo' ? '' : '18:00'}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          disabled={dia === 'Domingo'}
                        />
                        <input 
                          type="checkbox" 
                          defaultChecked={dia !== 'Domingo'}
                          className="ml-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Servicios y precios */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Servicios y Precios</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {servicios.map((servicio) => (
                    <div key={servicio.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{servicio.nombre}</div>
                        <div className="text-xs text-gray-600">{servicio.duracion} min</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{formatPrice(servicio.precio)}</span>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors">
                  Agregar Servicio
                </button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Acciones del Sistema</h3>
                  <p className="text-sm text-gray-600">Gestiona la configuración avanzada del sistema</p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Respaldar Datos
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                    Exportar Reportes
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                    Configuración Avanzada
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;