import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  FileText, 
  Search, 
  Clock, 
  Shield, 
  Users, 
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: "Submit Complaints",
      description: "Easy online form to report electrical issues and service problems",
      action: () => navigate("/complaint")
    },
    {
      icon: Search,
      title: "Track Progress",
      description: "Real-time tracking of your complaint status and resolution progress",
      action: () => navigate("/track")
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "24/7 automated ticketing system with rapid response times",
      action: () => navigate("/dashboard")
    }
  ];

  const stats = [
    { number: "24/7", label: "Support Available" },
    { number: "< 24hrs", label: "Average Response" },
    { number: "98%", label: "Resolution Rate" },
    { number: "50K+", label: "Customers Served" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-pulse-glow">
              <Zap className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              ElectricCare
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90">
              Professional Complaint Management System
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Streamlined platform for electricity distribution companies to manage customer 
              complaints, track issues, and provide exceptional service support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6"
                onClick={() => navigate("/complaint")}
              >
                <FileText className="h-5 w-5 mr-2" />
                Submit Complaint
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate("/track")}
              >
                <Search className="h-5 w-5 mr-2" />
                Track Ticket
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Complaint Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional tools designed to meet regulatory requirements and provide 
              exceptional customer service experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-corporate transition-all duration-300 cursor-pointer group border-border/50"
                onClick={feature.action}
              >
                <CardHeader className="text-center">
                  <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    variant="outline" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Compliance Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Regulatory Compliant Platform
              </h2>
              <p className="text-xl text-muted-foreground">
                Built to meet electricity regulatory commission requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground mb-4">Phase A Features (8 weeks)</h3>
                <div className="space-y-3">
                  {[
                    "Email integration system",
                    "Automatic ticketing workflow",
                    "Real-time ticket updates",
                    "Online complaint portal"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground mb-4">Phase B Features (3 months)</h3>
                <div className="space-y-3">
                  {[
                    "API integration capabilities",
                    "Omnichannel communication",
                    "Customer relationship management",
                    "Advanced analytics & reporting"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our support team is available 24/7 to help with urgent electrical issues
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/50 hover:shadow-subtle transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Emergency Line</h3>
                  <p className="text-sm text-muted-foreground mb-3">24/7 Emergency Support</p>
                  <Button variant="outline" size="sm">
                    (555) 911-POWER
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 hover:shadow-subtle transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">General Inquiries</p>
                  <Button variant="outline" size="sm">
                    support@electriccare.com
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 hover:shadow-subtle transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Service Centers</h3>
                  <p className="text-sm text-muted-foreground mb-3">Local Offices</p>
                  <Button variant="outline" size="sm">
                    Find Location
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
