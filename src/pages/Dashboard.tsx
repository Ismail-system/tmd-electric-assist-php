import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

interface TicketData {
  id: string;
  customerName: string;
  email: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  subject: string;
  createdAt: string;
  lastUpdate: string;
}

const mockTickets: TicketData[] = [
  {
    id: "TKT-2024-001",
    customerName: "John Doe",
    email: "john.doe@email.com",
    category: "Power Outage",
    priority: "Critical",
    status: "In Progress",
    subject: "Complete power outage in residential area",
    createdAt: "2024-01-15 09:30",
    lastUpdate: "2024-01-15 14:20"
  },
  {
    id: "TKT-2024-002",
    customerName: "Sarah Johnson",
    email: "sarah.j@email.com",
    category: "Billing",
    priority: "Medium",
    status: "Open",
    subject: "Incorrect billing amount on monthly statement",
    createdAt: "2024-01-15 11:45",
    lastUpdate: "2024-01-15 11:45"
  },
  {
    id: "TKT-2024-003",
    customerName: "Mike Wilson",
    email: "mike.w@email.com",
    category: "Connection",
    priority: "High",
    status: "Resolved",
    subject: "New electricity connection request",
    createdAt: "2024-01-14 16:20",
    lastUpdate: "2024-01-15 10:15"
  }
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-warning text-warning-foreground";
      case "In Progress": return "bg-primary text-primary-foreground";
      case "Resolved": return "bg-success text-success-foreground";
      case "Closed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-warning text-warning-foreground";
      case "Medium": return "bg-primary text-primary-foreground";
      case "Low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const stats = [
    { title: "Total Tickets", value: "1,247", icon: Ticket, change: "+12%" },
    { title: "Open Tickets", value: "86", icon: Clock, change: "+5%" },
    { title: "Resolved Today", value: "23", icon: CheckCircle, change: "+18%" },
    { title: "Critical Issues", value: "4", icon: AlertTriangle, change: "-25%" }
  ];

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Operator Dashboard</h1>
          <p className="text-muted-foreground">Manage and track customer complaints and service requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-subtle transition-all duration-300 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-success font-medium mt-1">{stat.change}</p>
                  </div>
                  <div className="bg-gradient-primary p-3 rounded-lg">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tickets Section */}
        <Card className="shadow-subtle border-border/50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Recent Tickets</CardTitle>
                <CardDescription>Manage customer complaints and service requests</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {ticket.id}
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{ticket.subject}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><span className="font-medium">Customer:</span> {ticket.customerName} ({ticket.email})</p>
                        <p><span className="font-medium">Category:</span> {ticket.category}</p>
                        <p><span className="font-medium">Created:</span> {ticket.createdAt}</p>
                        <p><span className="font-medium">Last Update:</span> {ticket.lastUpdate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                        Reply
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}