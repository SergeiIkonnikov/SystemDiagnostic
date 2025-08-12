# System Diagnostic Tool

A comprehensive React-based system diagnostic dashboard for monitoring and analyzing system health, security status, and performance metrics.

## 🚀 Features

### 📊 Interactive Dashboard
- **Real-time System Metrics**: CPU, Memory, Storage, and System Health monitoring
- **Interactive CPU Charts**: Hover tooltips showing detailed historical performance data
- **RAG Status Indicators**: Red-Amber-Green system for quick health assessment
- **Multi-tab Interface**: Overview, Analytics, and Monitoring tabs

### 🔒 Security Monitoring
- **Windows Updates Tracking**: Detailed patch information with installation dates
- **Antivirus Protection Status**: Real-time scanning status and definition updates
- **Comprehensive Security Reporting**: Specific KB numbers and version tracking

### ⚡ Performance Analytics
- **System Performance Metrics**: Detailed CPU and memory utilization
- **Storage Space Monitoring**: Capacity tracking with warning thresholds
- **Network Status**: Upload/download speeds and latency monitoring
- **Process Health**: Running processes, warnings, and error tracking

### 🎯 Advanced Features
- **Interactive Tooltips**: Detailed hover information for all system components
- **Export Functionality**: CSV, JSON, and ZIP export options
- **Refresh Capabilities**: Individual check refresh with visual feedback
- **Modal Dialogs**: Configurable diagnostic settings
- **Responsive Design**: Modern, mobile-friendly interface

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Custom SVG icons and emoji indicators
- **State Management**: React Hooks (useState, useMemo)
- **Build Tool**: Create React App with TypeScript template

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SergeiIkonnikov/SystemDiagnostic.git
   cd SystemDiagnostic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 Usage

### Overview Tab
- Monitor real-time system metrics
- View security status and system performance
- Access interactive CPU performance charts
- Check system health with detailed tooltips

### Analytics Tab
- Review performance trends and analytics
- Monitor network status and uptime
- Access comprehensive system reports
- View alert summaries and notifications

### Monitoring Tab
- Real-time system monitoring
- Active alerts and service status
- Live performance metrics
- System service health checks

## 🎨 UI Components

### Main Dashboard Cards
- **CPU Usage**: Interactive chart with 7-hour historical data
- **Storage Space**: Real-time capacity monitoring with warnings
- **Memory Usage**: Current utilization and availability
- **System Health**: Process status with detailed breakdowns

### Interactive Elements
- **Hover Tooltips**: Detailed information on hover
- **Refresh Buttons**: Individual component refresh capability
- **Export Options**: Multiple format export functionality
- **Modal Dialogs**: Configuration and settings interfaces

## 🔧 Configuration

### Diagnostic Settings
- **Time Frame**: Last Hour, Last 24 Hours, Last Week, Custom Range
- **Modules**: All Modules, Review, Respond, Research
- **Auto-refresh**: Configurable refresh intervals
- **Export Formats**: CSV, JSON, ZIP options

## 📈 Data Sources

The application includes multiple mock data sources:
- `healthCheckData.ts`: System health metrics
- `realDiagnosticData.ts`: Comprehensive diagnostic results
- `sampleResults.ts`: Sample test results
- Additional module-specific data files

## 🎯 Key Features Details

### RAG Status System
- **🟢 Optimal**: All systems operating normally
- **🟡 Monitoring**: Warning conditions that need attention
- **🔴 Critical**: Issues requiring immediate action

### Security Monitoring
- Specific Windows patch tracking (KB numbers)
- Antivirus version and definition monitoring
- Real-time protection status
- Scheduled scan information

### Performance Metrics
- CPU utilization with process breakdown
- Memory usage with available capacity
- Storage space with capacity warnings
- Network performance monitoring

## 🚀 Deployment

The application is deployed and accessible via GitHub. For production deployment:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred hosting platform**
   - Vercel, Netlify, GitHub Pages, or any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [https://github.com/SergeiIkonnikov/SystemDiagnostic](https://github.com/SergeiIkonnikov/SystemDiagnostic)
- **Issues**: Report bugs and request features
- **Documentation**: Comprehensive API and component documentation

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Designed for enterprise system monitoring
- Inspired by professional diagnostic tools and dashboards

---

**Made with ❤️ for system administrators and DevOps professionals**