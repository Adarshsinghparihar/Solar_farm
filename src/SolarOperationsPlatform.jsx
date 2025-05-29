import React, { useState, useEffect } from 'react';
import {
  Line,
  Bar,
  Pie,
  Doughnut
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
} from 'chart.js';
import { 
  Sun, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  Eye, 
  Activity,
  BarChart3,
  MapPin,
  Calendar,
  Wrench,
  Database,
  Cpu,
  Battery,
  Thermometer,
  Wind,
  Droplets,
  ChevronRight,
  Filter,
  Search,
  Bell,
  User,
  Menu,
  X,
  RefreshCw,
  Download,
  Upload,
  Play,
  Pause
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SolarOperationsPlatform = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFarm, setSelectedFarm] = useState('Farm-Alpha');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('power');
  const [selectedAssetType, setSelectedAssetType] = useState('all');
  const [selectedAssetStatus, setSelectedAssetStatus] = useState('all');
  const [assetSearchTerm, setAssetSearchTerm] = useState('');
  const [realTimeData, setRealTimeData] = useState({
    totalPower: 2847.5,
    efficiency: 94.2,
    temperature: 28.4,
    irradiance: 875,
    windSpeed: 12.3,
    humidity: 45
  });
  const [predictiveInsights] = useState([
    { metric: 'Power Output', prediction: '2.8 MW', trend: 'up', confidence: 92 },
    { metric: 'System Efficiency', prediction: '95.2%', trend: 'up', confidence: 88 },
    { metric: 'Weather Impact', prediction: 'Low Risk', trend: 'down', confidence: 85 },
    { metric: 'Maintenance Need', prediction: 'Medium', trend: 'up', confidence: 78 }
  ]);

  const [maintenanceSchedule] = useState([
    { id: 1, asset: 'Inverter Bank 7', type: 'Preventive', due: '2025-06-01', priority: 'high' },
    { id: 2, asset: 'Solar Panel Array A1', type: 'Cleaning', due: '2025-06-03', priority: 'medium' },
    { id: 3, asset: 'Weather Station 2', type: 'Calibration', due: '2025-06-05', priority: 'low' },
    { id: 4, asset: 'Tracking System C3', type: 'Repair', due: '2025-05-31', priority: 'critical' },
    { id: 5, asset: 'Transformer Unit 1', type: 'Inspection', due: '2025-06-07', priority: 'medium' }
  ]);

  const [compareMode, setCompareMode] = useState(false);

  // Move these above their first usage
  const monthlyData = [
    { month: 'Jan', production: 85000, target: 80000, efficiency: 89 },
    { month: 'Feb', production: 92000, target: 85000, efficiency: 91 },
    { month: 'Mar', production: 118000, target: 110000, efficiency: 93 },
    { month: 'Apr', production: 135000, target: 130000, efficiency: 94 },
    { month: 'May', production: 142000, target: 140000, efficiency: 95 },
    { month: 'Jun', production: 148000, target: 145000, efficiency: 96 }
  ];

  const weatherImpactData = [
    { condition: 'Clear Sky', hours: 65, avgPower: 2850, efficiency: 96 },
    { condition: 'Partly Cloudy', hours: 45, avgPower: 2200, efficiency: 91 },
    { condition: 'Overcast', hours: 25, avgPower: 1200, efficiency: 78 },
    { condition: 'Rain', hours: 8, avgPower: 400, efficiency: 45 }
  ];

  // Chart configurations
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const powerGenerationData = {
    labels: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM'],
    datasets: [
      {
        label: 'Power Output (kW)',
        data: [450, 1200, 2100, 2800, 2650, 1900, 800],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Efficiency (%)',
        data: [85, 92, 95, 96, 94, 91, 87],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  const monthlyPerformanceData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Production (MWh)',
        data: monthlyData.map(d => d.production/1000),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Target (MWh)',
        data: monthlyData.map(d => d.target/1000),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
      },
    ],
  };

  const weatherImpactChartData = {
    labels: weatherImpactData.map(d => d.condition),
    datasets: [
      {
        label: 'Impact Duration (Hours)',
        data: weatherImpactData.map(d => d.hours),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        totalPower: prev.totalPower + (Math.random() - 0.5) * 50,
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
        temperature: prev.temperature + (Math.random() - 0.5) * 1,
        irradiance: Math.max(400, Math.min(1200, prev.irradiance + (Math.random() - 0.5) * 100)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3),
        humidity: Math.max(20, Math.min(80, prev.humidity + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const farms = [
    { id: 'Farm-Alpha', name: 'Solar Farm Alpha', location: 'Arizona, USA', capacity: '100MW' },
    { id: 'Farm-Beta', name: 'Solar Farm Beta', location: 'Nevada, USA', capacity: '75MW' },
    { id: 'Farm-Gamma', name: 'Solar Farm Gamma', location: 'California, USA', capacity: '150MW' }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Panel efficiency drop detected in Section B3', time: '2 min ago' },
    { id: 2, type: 'maintenance', message: 'Scheduled maintenance due for Inverter Bank 7', time: '1 hour ago' },
    { id: 3, type: 'info', message: 'Weather forecast: High winds expected tomorrow', time: '3 hours ago' }
  ];

  const digitalTwinData = [
    { section: 'A1-A5', panels: 250, status: 'optimal', efficiency: 96.2, temp: 29.1 },
    { section: 'B1-B5', panels: 240, status: 'degraded', efficiency: 88.4, temp: 31.2 },
    { section: 'C1-C5', panels: 260, status: 'optimal', efficiency: 95.8, temp: 28.7 },
    { section: 'D1-D5', panels: 235, status: 'maintenance', efficiency: 0, temp: 25.3 }
  ];

  const performanceData = [
    { time: '00:00', power: 0, efficiency: 0, irradiance: 0 },
    { time: '06:00', power: 450, efficiency: 85, irradiance: 200 },
    { time: '08:00', power: 1200, efficiency: 92, irradiance: 500 },
    { time: '10:00', power: 2100, efficiency: 95, irradiance: 750 },
    { time: '12:00', power: 2800, efficiency: 96, irradiance: 950 },
    { time: '14:00', power: 2650, efficiency: 94, irradiance: 900 },
    { time: '16:00', power: 1900, efficiency: 91, irradiance: 650 },
    { time: '18:00', power: 800, efficiency: 87, irradiance: 300 },
    { time: '20:00', power: 0, efficiency: 0, irradiance: 0 }
  ];

  const assetInventory = [
    {
      id: 'PNL-001-125',
      name: 'Solar Panel Array A1-001',
      type: 'Solar Panel',
      manufacturer: 'SunPower',
      model: 'SPR-X22-370',
      serialNumber: 'SP2024001125',
      installDate: '2023-03-15',
      warrantyExpiry: '2048-03-15',
      status: 'operational',
      health: 96,
      location: 'Section A1, Row 1-5',
      capacity: '1.85kW',
      lastMaintenance: '2024-04-10',
      nextMaintenance: '2024-10-10',
      cost: '$2,850'
    },
    {
      id: 'INV-007-B2',
      name: 'String Inverter Bank 7',
      type: 'Inverter',
      manufacturer: 'SMA',
      model: 'Sunny Tripower 25000TL',
      serialNumber: 'SMA240070B2',
      installDate: '2023-02-20',
      warrantyExpiry: '2033-02-20',
      status: 'maintenance',
      health: 87,
      location: 'Inverter Building B',
      capacity: '25kW',
      lastMaintenance: '2024-05-15',
      nextMaintenance: '2024-06-15',
      cost: '$8,500'
    },
    {
      id: 'TRK-014-C3',
      name: 'Solar Tracker System C3',
      type: 'Tracking System',
      manufacturer: 'Array Technologies',
      model: 'DuraTrack HZ v3',
      serialNumber: 'AT2024014C3',
      installDate: '2023-04-05',
      warrantyExpiry: '2038-04-05',
      status: 'degraded',
      health: 78,
      location: 'Section C3',
      capacity: 'N/A',
      lastMaintenance: '2024-03-20',
      nextMaintenance: '2024-06-12',
      cost: '$15,200'
    },
    {
      id: 'WS-003-MT',
      name: 'Weather Station 3',
      type: 'Monitoring',
      manufacturer: 'Campbell Scientific',
      model: 'CR6 DataLogger',
      serialNumber: 'CS2024003MT',
      installDate: '2023-01-10',
      warrantyExpiry: '2028-01-10',
      status: 'operational',
      health: 92,
      location: 'Meteorological Tower',
      capacity: 'N/A',
      lastMaintenance: '2024-05-01',
      nextMaintenance: '2024-08-01',
      cost: '$3,200'
    },
    {
      id: 'CAB-025-D1',
      name: 'DC Combiner Box D1-025',
      type: 'Electrical',
      manufacturer: 'Schneider Electric',
      model: 'PTCB-16-600VDC',
      serialNumber: 'SE2024025D1',
      installDate: '2023-03-25',
      warrantyExpiry: '2043-03-25',
      status: 'operational',
      health: 94,
      location: 'Section D1',
      capacity: '600VDC',
      lastMaintenance: '2024-04-25',
      nextMaintenance: '2024-10-25',
      cost: '$1,200'
    },
    {
      id: 'TRF-001-MV',
      name: 'Main Power Transformer',
      type: 'Transformer',
      manufacturer: 'ABB',
      model: 'ONAN-34.5kV',
      serialNumber: 'ABB2024001MV',
      installDate: '2022-12-01',
      warrantyExpiry: '2052-12-01',
      status: 'operational',
      health: 98,
      location: 'Main Substation',
      capacity: '150MVA',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2025-02-15',
      cost: '$285,000'
    }
  ];

  const assetTypes = ['all', 'Solar Panel', 'Inverter', 'Tracking System', 'Monitoring', 'Electrical', 'Transformer'];
  const assetStatuses = ['all', 'operational', 'maintenance', 'degraded', 'offline'];

  const lifecycleStages = [
    { stage: 'Planning', count: 15, color: 'bg-blue-500' },
    { stage: 'Procurement', count: 8, color: 'bg-purple-500' },
    { stage: 'Installation', count: 12, color: 'bg-yellow-500' },
    { stage: 'Commissioning', count: 5, color: 'bg-orange-500' },
    { stage: 'Operation', count: 1247, color: 'bg-green-500' },
    { stage: 'Maintenance', count: 23, color: 'bg-red-500' },
    { stage: 'Decommissioning', count: 2, color: 'bg-gray-500' }
  ];

  const digitalThreadEvents = [
    { id: 1, asset: 'INV-007-B2', event: 'Performance Alert', description: 'Efficiency dropped below 90%', timestamp: '2024-05-28 14:23', severity: 'medium' },
    { id: 2, asset: 'PNL-001-125', event: 'Maintenance Completed', description: 'Routine cleaning and inspection completed', timestamp: '2024-05-28 09:15', severity: 'info' },
    { id: 3, asset: 'TRK-014-C3', event: 'Calibration Required', description: 'Tracking accuracy deviation detected', timestamp: '2024-05-27 16:45', severity: 'high' },
    { id: 4, asset: 'WS-003-MT', event: 'Data Anomaly', description: 'Wind speed sensor showing inconsistent readings', timestamp: '2024-05-27 11:30', severity: 'medium' },
    { id: 5, asset: 'TRF-001-MV', event: 'Temperature Monitor', description: 'Operating within normal parameters', timestamp: '2024-05-27 08:00', severity: 'info' }
  ];

  const warrantyTracking = [
    { type: 'Solar Panels', total: 985, expiring: 45, expired: 2, nextExpiry: '2025-03-15' },
    { type: 'Inverters', total: 48, expiring: 3, expired: 0, nextExpiry: '2025-08-20' },
    { type: 'Tracking Systems', total: 156, expiring: 12, expired: 1, nextExpiry: '2025-06-12' },
    { type: 'Monitoring Equipment', total: 24, expiring: 2, expired: 0, nextExpiry: '2026-01-10' }
  ];

  const filteredAssets = assetInventory.filter(asset => {
    const matchesType = selectedAssetType === 'all' || asset.type === selectedAssetType;
    const matchesStatus = selectedAssetStatus === 'all' || asset.status === selectedAssetStatus;
    const matchesSearch = assetSearchTerm === '' || 
      asset.name.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
      asset.manufacturer.toLowerCase().includes(assetSearchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const AssetManagementSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Asset Management</h2>
        <div className="flex flex-wrap items-center space-x-2 space-y-2 sm:space-y-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Assets
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm">
            <Database className="w-4 h-4 mr-2" />
            Add Asset
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Asset Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Assets"
          value="1,312"
          icon={Database}
          color="blue"
        />
        <MetricCard
          title="Operational"
          value="1,247"
          icon={Activity}
          trend={2.1}
          color="green"
        />
        <MetricCard
          title="Under Maintenance"
          value="23"
          icon={Wrench}
          color="yellow"
        />
        <MetricCard
          title="Asset Health Avg"
          value="94.2"
          unit="%"
          icon={TrendingUp}
          trend={1.8}
          color="green"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap items-center space-x-4 space-y-2 sm:space-y-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                value={assetSearchTerm}
                onChange={(e) => setAssetSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedAssetType}
              onChange={(e) => setSelectedAssetType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {assetTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <select
              value={selectedAssetStatus}
              onChange={(e) => setSelectedAssetStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {assetStatuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredAssets.length} of {assetInventory.length} assets
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Inventory Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Asset Inventory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Maintenance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{asset.type}</div>
                      <div className="text-sm text-gray-500">{asset.manufacturer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        asset.status === 'operational' ? 'bg-green-100 text-green-800' :
                        asset.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        asset.status === 'degraded' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              asset.health >= 90 ? 'bg-green-500' :
                              asset.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{width: `${asset.health}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{asset.health}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{asset.nextMaintenance}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lifecycle Stages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Lifecycle</h3>
          <div className="space-y-4">
            {lifecycleStages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <span className="text-sm text-gray-700">{stage.stage}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{stage.count}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Lifecycle Distribution</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Pre-Operation (3%)</span>
                <span>Operation (95%)</span>
                <span>End-of-Life (2%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500" style={{width: '3%'}}></div>
                  <div className="bg-green-500" style={{width: '95%'}}></div>
                  <div className="bg-gray-500" style={{width: '2%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Thread & Warranty Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digital Thread Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Digital Thread Events</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-3">
            {digitalThreadEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className={`p-1 rounded-full mt-1 ${
                  event.severity === 'high' ? 'bg-red-100' :
                  event.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    event.severity === 'high' ? 'bg-red-500' :
                    event.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{event.event}</p>
                    <span className="text-xs text-gray-500">{event.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Asset: {event.asset}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warranty Tracking */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Warranty Tracking</h3>
          </div>
          <div className="space-y-4">
            {warrantyTracking.map((warranty, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{warranty.type}</span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-green-600">{warranty.total - warranty.expiring - warranty.expired} Active</span>
                    <span className="text-yellow-600">{warranty.expiring} Expiring</span>
                    <span className="text-red-600">{warranty.expired} Expired</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500" 
                      style={{width: `${((warranty.total - warranty.expiring - warranty.expired) / warranty.total) * 100}%`}}
                    ></div>
                    <div 
                      className="bg-yellow-500" 
                      style={{width: `${(warranty.expiring / warranty.total) * 100}%`}}
                    ></div>
                    <div 
                      className="bg-red-500" 
                      style={{width: `${(warranty.expired / warranty.total) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Next expiry: {warranty.nextExpiry}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Warranty Alerts</span>
              <span className="text-red-600 font-medium">12 require attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Performance Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Asset Performance Analytics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">$2.4M</div>
            <div className="text-sm text-gray-600">Total Asset Value</div>
            <div className="text-xs text-green-600 mt-1">+5.2% from last quarter</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
            <div className="text-sm text-gray-600">Asset Availability</div>
            <div className="text-xs text-green-600 mt-1">+1.3% improvement</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.2 yrs</div>
            <div className="text-sm text-gray-600">Avg Remaining Life</div>
            <div className="text-xs text-gray-600 mt-1">Based on current degradation</div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
        <div className="flex flex-wrap items-center space-x-2 space-y-2 sm:space-y-0">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="power">Power Output</option>
            <option value="efficiency">System Efficiency</option>
            <option value="revenue">Revenue</option>
            <option value="weather">Weather Impact</option>
          </select>
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              compareMode ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Compare Farms
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.3%
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">Total Energy (MTD)</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">148.2</span>
              <span className="text-sm text-gray-500 ml-1">MWh</span>
            </div>
            <div className="text-xs text-gray-500">Target: 145.0 MWh</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-50">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.1%
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">Avg Efficiency</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">94.8</span>
              <span className="text-sm text-gray-500 ml-1">%</span>
            </div>
            <div className="text-xs text-gray-500">Industry avg: 91.2%</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-50">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.7%
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">Revenue (MTD)</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">$89.4K</span>
            </div>
            <div className="text-xs text-gray-500">$0.603/kWh avg rate</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-50">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
              -15.2%
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">Downtime</h3>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">2.4</span>
              <span className="text-sm text-gray-500 ml-1">hrs</span>
            </div>
            <div className="text-xs text-gray-500">0.33% of total time</div>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Power Generation Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Power Generation</h3>
          <div className="h-64">
            <Line data={powerGenerationData} options={lineChartOptions} />
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Monthly Performance vs Target</h3>
          </div>
          <div className="h-64">
            <Bar data={monthlyPerformanceData} options={lineChartOptions} />
          </div>
        </div>
      </div>

      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Impact Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Impact Analysis</h3>
          <div className="space-y-4">
            {weatherImpactData.map((weather, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{weather.condition}</span>
                  <span className="text-sm text-gray-600">{weather.hours}h</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          weather.efficiency > 90 ? 'bg-green-500' :
                          weather.efficiency > 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${(weather.efficiency / 100) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{weather.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI Predictive Insights</h3>
          <div className="space-y-4">
            {predictiveInsights.map((insight, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{insight.metric}</span>
                  <div className={`flex items-center text-xs ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{insight.prediction}</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{width: `${insight.confidence}%`}}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance vs Industry</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Energy Yield</span>
                <span className="text-sm font-medium text-green-600">+12% above avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '88%'}}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">System Availability</span>
                <span className="text-sm font-medium text-green-600">+5% above avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">O&M Costs</span>
                <span className="text-sm font-medium text-green-600">-8% below avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Overall Ranking</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-green-600">#3</span>
                  <span className="text-sm text-gray-500 ml-1">of 147 farms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reports Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Automated Reports</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Daily Operations Report', last: '2 hours ago', status: 'completed' },
            { title: 'Weekly Performance Summary', last: '1 day ago', status: 'completed' },
            { title: 'Monthly Financial Report', last: '3 days ago', status: 'completed' },
            { title: 'Quarterly Sustainability Report', last: '15 days ago', status: 'pending' }
          ].map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                <div className={`w-2 h-2 rounded-full ${
                  report.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              <p className="text-xs text-gray-600 mb-3">Last generated: {report.last}</p>
              <div className="flex items-center space-x-2">
                <button className="text-xs text-blue-600 hover:text-blue-800">View</button>
                <button className="text-xs text-blue-600 hover:text-blue-800">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MetricCard = ({ title, value, unit, icon: Icon, trend, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500 ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );

  const DigitalTwinSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Digital Twin Overview</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Play className="w-4 h-4 mr-2" />
            Live View
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">3D Farm Layout</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <img
              src="/power-renewabale-energy-electricity-scheme-with-solar-buildings.webp"
              alt="3D Solar Farm Layout"
              className="mx-auto rounded shadow object-contain"
              style={{ maxHeight: '90%', maxWidth: '95%' }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Section Performance</h3>
          <div className="space-y-3">
            {digitalTwinData.map((section, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    section.status === 'optimal' ? 'bg-green-500' :
                    section.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{section.section}</p>
                    <p className="text-sm text-gray-500">{section.panels} panels</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{section.efficiency}%</p>
                  <p className="text-sm text-gray-500">{section.temp}°C</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Inverters</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                </div>
                <span className="text-sm font-medium">94%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Panels</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '91%'}}></div>
                </div>
                <span className="text-sm font-medium">91%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trackers</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <span className="text-sm font-medium">78%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Predictive Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">2 components need attention in 7 days</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Performance trending +2.3% this month</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Wrench className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">Optimal maintenance window: June 15-20</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Digital Thread</h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Asset Lifecycle Tracking</div>
            <div className="flex items-center justify-between text-sm">
              <span>Components Traced</span>
              <span className="font-medium">2,847</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Data Points/Hour</span>
              <span className="font-medium">125K</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Integration Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MaintenanceSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Predictive Maintenance</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Wrench className="w-4 h-4 mr-2" />
            Schedule
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Active Alerts"
          value="7"
          icon={AlertTriangle}
          color="yellow"
        />
        <MetricCard
          title="Scheduled Tasks"
          value="12"
          icon={Calendar}
          color="blue"
        />
        <MetricCard
          title="Completion Rate"
          value="94.2"
          unit="%"
          icon={TrendingUp}
          trend={2.3}
          color="green"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Maintenance Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceSchedule.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.asset}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{item.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{item.due}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      item.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const OverviewSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Power Output"
          value={realTimeData.totalPower.toFixed(1)}
          unit="kW"
          icon={Zap}
          trend={2.4}
          color="blue"
        />
        <MetricCard
          title="System Efficiency"
          value={realTimeData.efficiency.toFixed(1)}
          unit="%"
          icon={TrendingUp}
          trend={1.2}
          color="green"
        />
        <MetricCard
          title="Temperature"
          value={realTimeData.temperature.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          color="orange"
        />
        <MetricCard
          title="Solar Irradiance"
          value={realTimeData.irradiance.toFixed(0)}
          unit="W/m²"
          icon={Sun}
          color="yellow"
        />
        <MetricCard
          title="Wind Speed"
          value={realTimeData.windSpeed.toFixed(1)}
          unit="m/s"
          icon={Wind}
          color="cyan"
        />
        <MetricCard
          title="Humidity"
          value={realTimeData.humidity.toFixed(0)}
          unit="%"
          icon={Droplets}
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Power Generation Trend</h3>
          <div className="h-64">
            <Line data={powerGenerationData} options={lineChartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className={`p-1 rounded-full ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'maintenance' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.type === 'warning' ? 'text-yellow-600' :
                    alert.type === 'maintenance' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SolarOps Platform</h1>
                  <p className="text-sm text-gray-500 hidden sm:block">Digital Twin & Thread Operations</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedFarm}
                onChange={(e) => setSelectedFarm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
              </select>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none`}>
          <nav className="mt-8 px-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'digital-twin', label: 'Digital Twin', icon: Cpu },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'assets', label: 'Asset Management', icon: Database },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'overview' && <OverviewSection />}
            {activeTab === 'digital-twin' && <DigitalTwinSection />}
            {activeTab === 'maintenance' && <MaintenanceSection />}
            {activeTab === 'analytics' && <AnalyticsSection />}
            {activeTab === 'assets' && <AssetManagementSection />}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Platform Settings</h3>
                <p className="text-gray-600">Configure system preferences and integrations</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default SolarOperationsPlatform;
