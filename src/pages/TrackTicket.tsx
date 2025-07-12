import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MessageSquare,
  Phone,
  Mail,
  User,
  MapPin,
  Calendar,
  Zap
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

interface TicketDetails {
  id: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High" | "Critical";
  category: string;
  subject: string;
  description: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  lastUpdate: string;
  estimatedResolution: string;
  assignedAgent: string;
  updates: Array<{
    timestamp: string;
    message: string;
    author: string;
    type: "system" | "agent" | "customer";
  }>;
}

const mockTicketData: { [key: string]: TicketDetails } = {
  "TKT-2024-001": {
    id: "TKT-2024-001",
    status: "In Progress",
    priority: "Critical",
    category: "Power Outage",
    subject: "Complete power outage in residential area",
    description: "Complete power outage affecting entire residential block. Started at approximately 8:30 AM this morning. No power to any homes in the area.",
    customerName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
    createdAt: "2024-01-15 09:30",
    lastUpdate: "2024-01-15 14:20",
    estimatedResolution: "2024-01-15 18:00",
    assignedAgent: "Sarah Wilson (Technical Team)",
    updates: [
      {
        timestamp: "2024-01-15 09:30",
        message: "Complaint received and ticket created. Initial assessment in progress.",
        author: "System",
        type: "system"
      },
      {
        timestamp: "2024-01-15 10:15",
        message: "Technical team dispatched to investigate the outage. ETA: 45 minutes.",
        author: "Sarah Wilson",
        type: "agent"
      },
      {
        timestamp: "2024-01-15 11:30",
        message: "Issue identified - transformer failure. Replacement unit being arranged.",
        author: "Technical Team",
        type: "agent"
      },
      {
        timestamp: "2024-01-15 14:20",
        message: "Replacement transformer arrived. Installation in progress. Estimated completion: 6:00 PM.",
        author: "Sarah Wilson",
        type: "agent"
      }
    ]
  },
  "TKT-2024-002": {
    id: "TKT-2024-002",
    status: "Open",
    priority: "Medium",
    category: "Billing",
    subject: "Incorrect billing amount on monthly statement",
    description: "My monthly bill shows an unusually high amount this month. The consumption appears to be 3x higher than normal usage patterns.",
    customerName: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Pine Avenue, Springfield, IL 62702",
    createdAt: "2024-01-15 11:45",
    lastUpdate: "2024-01-15 11:45",
    estimatedResolution: "2024-01-17 17:00",
    assignedAgent: "Mike Chen (Billing Department)",
    updates: [
      {
        timestamp: "2024-01-15 11:45",
        message: "Billing inquiry received. Account review initiated.",
        author: "System",
        type: "system"
      }
    ]
  }
};

export default function TrackTicket() {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState<TicketDetails | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = () => {
    setSearchAttempted(true);
    const formattedId = ticketId.toUpperCase().trim();
    const found = mockTicketData[formattedId];
    setTicketData(found || null);
  };

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

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "system": return <AlertTriangle className="h-4 w-4" />;
      case "agent": return <User className="h-4 w-4" />;
      case "customer": return <MessageSquare className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Ticket</h1>
            <p className="text-muted-foreground">
              Enter your ticket number to check the status and progress of your complaint
            </p>
          </div>

          {/* Search Form */}
          <Card className="shadow-corporate border-border/50 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Ticket Lookup
              </CardTitle>
              <CardDescription>
                Enter your ticket number (e.g., TKT-2024-001) to view details and status updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="ticketId" className="sr-only">Ticket Number</Label>
                  <Input
                    id="ticketId"
                    placeholder="Enter ticket number (e.g., TKT-2024-001)"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="text-center font-mono"
                  />
                </div>
                <Button onClick={handleSearch} variant="corporate" className="sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Search Ticket
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {searchAttempted && (
            <>
              {ticketData ? (
                <div className="space-y-6">
                  {/* Ticket Overview */}
                  <Card className="shadow-corporate border-border/50">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl">{ticketData.subject}</CardTitle>
                          <CardDescription className="font-mono">{ticketData.id}</CardDescription>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getStatusColor(ticketData.status)}>
                            {ticketData.status}
                          </Badge>
                          <Badge className={getPriorityColor(ticketData.priority)}>
                            {ticketData.priority} Priority
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Customer:</span>
                            <span>{ticketData.customerName}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Email:</span>
                            <span>{ticketData.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Phone:</span>
                            <span>{ticketData.phone}</span>
                          </div>
                          <div className="flex items-start gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <span className="font-medium">Address:</span>
                            <span>{ticketData.address}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Created:</span>
                            <span>{ticketData.createdAt}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Last Update:</span>
                            <span>{ticketData.lastUpdate}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Expected Resolution:</span>
                            <span>{ticketData.estimatedResolution}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Assigned to:</span>
                            <span>{ticketData.assignedAgent}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-accent rounded-lg">
                        <h4 className="font-medium mb-2">Issue Description:</h4>
                        <p className="text-sm text-muted-foreground">{ticketData.description}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status Updates */}
                  <Card className="shadow-corporate border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Status Updates
                      </CardTitle>
                      <CardDescription>
                        Timeline of actions and communications regarding your complaint
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ticketData.updates.map((update, index) => (
                          <div key={index} className="flex gap-4 p-4 border border-border rounded-lg">
                            <div className="bg-gradient-primary p-2 rounded-full flex-shrink-0">
                              {getUpdateIcon(update.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-sm">{update.author}</p>
                                <p className="text-xs text-muted-foreground">{update.timestamp}</p>
                              </div>
                              <p className="text-sm text-muted-foreground">{update.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Options */}
                  <Card className="shadow-corporate border-border/50">
                    <CardHeader>
                      <CardTitle>Need Additional Help?</CardTitle>
                      <CardDescription>
                        Contact our support team for further assistance with your ticket
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Support: (555) 123-HELP
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Mail className="h-4 w-4 mr-2" />
                          Email: support@electriccare.com
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="shadow-corporate border-border/50 text-center">
                  <CardContent className="p-8">
                    <div className="bg-destructive/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Search className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ticket Not Found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find a ticket with the number "{ticketId}". Please check your ticket number and try again.
                    </p>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>Make sure your ticket number:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Follows the format TKT-YYYY-XXX (e.g., TKT-2024-001)</li>
                        <li>Is spelled correctly with no extra spaces</li>
                        <li>Was issued within the last 12 months</li>
                      </ul>
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" onClick={() => window.location.href = "/complaint"}>
                        Submit a New Complaint
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}