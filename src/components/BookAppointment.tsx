import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Doctor interface matched to your backend
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

export default function BookAppointment() {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:4000/doctors/${doctorId}`)
        .then((response) => setDoctor(response.data))
        .catch(() => setDoctor(null));
    }
  }, [doctorId]);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto flex items-center justify-center">
        <p className="text-text-primary">Doctor not found</p>
      </div>
    );
  }

  // -- Derive specialities as array (for badge rendering)
  const specialities =
    Array.isArray(doctor.speciality) // unlikely, but safe
      ? doctor.speciality
      : typeof doctor.speciality === "string"
      ? doctor.speciality.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  // -- Build consulting times string (availability)
  const consultingAvailability = `${doctor.consultingDays}${
    doctor.consultingHours && doctor.consultingHours.length > 0
      ? ` | ${doctor.consultingHours[0]} - ${
          doctor.consultingHours[doctor.consultingHours.length - 1]
        }`
      : ""
  }`;

  // -- Choose earliest available date — customize if you wish.
  // If you want to make this dynamic based on hour, date, adjust accordingly.
  const earliestAvailable =
    doctor.consultingHours && doctor.consultingHours.length > 0
      ? `Today, ${doctor.consultingHours[0]}`
      : "Today, 10:00 AM";

  // -- Handle booking (navigate to doctor profile, could post to backend, etc.)
  const handleBookAppointment = () => {
    // Navigate to doctor profile or confirmation page
    navigate(`/doctor/${doctor.id}`);
  };

  return (
    <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto">
      {/* Header Section */}
      <div className="bg-shedula-brand px-4 pt-12 pb-20 relative">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-lg font-medium">
            Book Appointment
          </h1>
          <div className="w-9"></div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-t-3xl -mt-16 relative z-10 px-4 pt-6 pb-24">
        {/* Doctor Info Card */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border mb-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <h2 className="text-base font-semibold text-text-primary mb-1">
                {doctor.name}
              </h2>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {doctor.role}
              </p>
              <p className="text-sm font-medium text-shedula-brand mb-2">
                {doctor.qualification}
              </p>
              <p className="text-xs text-text-secondary">
                {doctor.hospital}
              </p>
            </div>
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=64&h=64`}
                alt={doctor.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Speciality Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Speciality
          </h3>
          <div className="flex flex-wrap gap-2">
            {specialities.map((speciality, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs font-normal px-3 py-1 border-border text-text-secondary"
              >
                {speciality}
              </Badge>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            About Doctor
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {doctor.about}
          </p>
        </div>

        {/* Availability Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Availability For Consulting
          </h3>
          <p className="text-sm text-text-secondary">{consultingAvailability}</p>
        </div>

        {/* Earliest Appointment */}
        <div className="mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs text-shedula-brand font-medium mb-2">
              Earliest Available Appointment
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">
                  {earliestAvailable}
                </span>
              </div>
              <button className="p-1">
                <Info className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <Button
          onClick={handleBookAppointment}
          className="w-full h-12 bg-shedula-brand hover:bg-shedula-brand/90 text-white font-semibold rounded-xl"
        >
          Book appointment
        </Button>
      </div>
    </div>
  );
}
