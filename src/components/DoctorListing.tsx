import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Bell,
  Heart,
  MapPin,
  Clock,
  Stethoscope,
  Calendar,
  FileText,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Updated interface based on your db.json
interface Doctor {
  id: number | string;
  name: string;
  role: string;
  speciality: string;
  hospital: string;
  image: string;
  patients: string;
  experience: string;
  rating: string;
  qualification: string;
  service: string;
  about: string;
  consultingHours: string[];
  consultingDays: string;
  isFavorite: boolean;
}

export default function DoctorListing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("doctors");
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get<Doctor[]>(
          "http://localhost:4000/doctors"
        );
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Toggle favorite (state only)
  const toggleFavorite = (doctorId: number | string) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === doctorId
          ? { ...doctor, isFavorite: !doctor.isFavorite }
          : doctor
      )
    );
  };

  // Filter based on name/role search
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-poppins">
      <div className="max-w-sm mx-auto min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="px-4 pt-12 pb-6">
            <div className="flex items-start justify-between mb-6">
              {/* Greeting Block */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-shedula-brand flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">P</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-text-primary">
                    Hello, Priya
                  </h1>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-text-secondary" />
                    <span className="text-sm text-text-secondary">
                      @ Dombivli, Mumbai
                    </span>
                  </div>
                </div>
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-accent transition-colors">
                  <Bell className="w-5 h-5 text-text-primary" />
                  {notificationCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-shedula-danger rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {notificationCount}
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                type="text"
                placeholder="Search Doctors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-input-bg border-input-border rounded-xl text-base"
              />
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="px-4 pb-6 space-y-4">
            {loading && (
              <p className="text-center text-sm text-text-secondary">
                Loading...
              </p>
            )}
            {error && (
              <p className="text-center text-shedula-danger">{error}</p>
            )}
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => navigate(`/doctor/${doctor.id}`)}
                className="bg-card rounded-xl p-4 shadow-sm border border-border cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex space-x-4">
                  {/* Doctor Image */}
                  <div className="w-20 h-20 flex-shrink-0 relative">
                    <img
                      src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=80&h=80`}
                      alt={doctor.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Doctor Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-text-primary mb-1">
                          {doctor.name}
                        </h3>
                        <p className="text-sm font-medium text-shedula-brand">
                          {doctor.role}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(doctor.id);
                        }}
                        className="p-1 rounded-full hover:bg-accent transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            doctor.isFavorite
                              ? "fill-shedula-danger text-shedula-danger"
                              : "text-text-secondary"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Available today */}
                    <Badge
                      variant="secondary"
                      className="mb-2 bg-shedula-success text-white text-xs font-normal px-2 py-1"
                    >
                      Available today
                    </Badge>

                    {/* About (Short) */}
                    <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                      {doctor.about.length > 70
                        ? doctor.about.slice(0, 70) + "..."
                        : doctor.about}
                    </p>

                    {/* Consulting Hours */}
                    <div className="flex items-center space-x-1 text-xs text-text-primary">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">
                        {doctor.consultingHours && doctor.consultingHours.length > 0
                          ? `${doctor.consultingHours[0]} - ${doctor.consultingHours[doctor.consultingHours.length - 1]}`
                          : "08:30 AM–07:00 PM"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-background border-t border-border">
          <div className="flex items-center justify-around py-2 px-4">
            <button
              onClick={() => setActiveTab("doctors")}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === "doctors"
                  ? "text-shedula-brand"
                  : "text-text-secondary"
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              <span className="text-xs font-medium">Find a Doctor</span>
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === "appointments"
                  ? "text-shedula-brand"
                  : "text-text-secondary"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-medium">Appointment</span>
            </button>
            <button
              onClick={() => setActiveTab("records")}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === "records"
                  ? "text-shedula-brand"
                  : "text-text-secondary"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs font-medium">Records</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === "profile"
                  ? "text-shedula-brand"
                  : "text-text-secondary"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}