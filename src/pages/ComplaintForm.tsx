import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  Upload,
  Zap
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

interface ComplaintFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  accountNumber: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  consent: boolean;
}

export default function ComplaintForm() {
  const [formData, setFormData] = useState<ComplaintFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    accountNumber: "",
    category: "",
    priority: "",
    subject: "",
    description: "",
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleInputChange = (field: keyof ComplaintFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTicketNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TKT-${year}${month}${day}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please provide consent to process your complaint.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTicketNumber = generateTicketNumber();
    setTicketNumber(newTicketNumber);
    setIsSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: "Complaint Submitted Successfully!",
      description: `Your ticket number is ${newTicketNumber}. You will receive email updates.`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center shadow-corporate border-border/50">
              <CardContent className="p-8">
                <div className="bg-gradient-primary p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Complaint Submitted Successfully!</h2>
                <div className="bg-accent p-4 rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Your Ticket Number:</p>
                  <p className="text-2xl font-bold text-primary font-mono">{ticketNumber}</p>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground mb-6">
                  <p className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email confirmation sent to {formData.email}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    SMS updates will be sent to {formData.phone}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Expected response time: Within 24 hours
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="corporate" 
                    onClick={() => window.location.href = "/track"}
                  >
                    Track Your Ticket
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        address: "",
                        accountNumber: "",
                        category: "",
                        priority: "",
                        subject: "",
                        description: "",
                        consent: false
                      });
                    }}
                  >
                    Submit Another Complaint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Submit a Complaint</h1>
            <p className="text-muted-foreground">
              Report issues with your electricity service and we'll address them promptly
            </p>
          </div>

          {/* Form */}
          <Card className="shadow-corporate border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Complaint Details
              </CardTitle>
              <CardDescription>
                Please provide detailed information about your issue. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        required
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>

                {/* Address & Account */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Service Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        required
                        className="pl-10 min-h-[80px]"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter the complete address where the issue is occurring"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number (Optional)</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                      placeholder="Enter your account number if available"
                    />
                  </div>
                </div>

                {/* Complaint Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Issue Category *</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power-outage">Power Outage</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="connection">New Connection</SelectItem>
                        <SelectItem value="maintenance">Maintenance Issues</SelectItem>
                        <SelectItem value="equipment">Equipment Problems</SelectItem>
                        <SelectItem value="voltage">Voltage Fluctuation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical - Life threatening</SelectItem>
                        <SelectItem value="high">High - Urgent repair needed</SelectItem>
                        <SelectItem value="medium">Medium - Important but not urgent</SelectItem>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Issue Summary *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of the issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    required
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Please provide a detailed description of the issue, including when it started, any error messages, and steps you've already taken..."
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Supporting Documents (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload photos, bills, or other relevant documents
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Consent */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleInputChange("consent", checked as boolean)}
                  />
                  <Label htmlFor="consent" className="text-sm">
                    I consent to the processing of my personal data for complaint resolution purposes and agree to receive updates via email and SMS. *
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="corporate"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting Complaint...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Submit Complaint
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}