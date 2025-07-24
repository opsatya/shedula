import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Users,
  Calendar,
  Star,
  Clock,
  MapPin,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

// TypeScript interface based on your 'db.json'
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

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    if (!doctorId) {
      setError("No doctor id provided");
      setLoading(false);
      return;
    }
    axios
      .get<Doctor>(`http://localhost:4000/doctors/${doctorId}`)
      .then((response) => {
        setDoctor(response.data);
        setIsFavorite(response.data.isFavorite);
        setLoading(false);
      })
      .catch(() => {
        setError("Doctor not found");
        setDoctor(null);
        setLoading(false);
      });
  }, [doctorId]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // Optionally, you can PATCH to your backend here for persistent favorite changes
  };

  const handleBookAppointment = () => {
    if (doctor) {
      navigate(`/book-appointment/${doctor.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto flex items-center justify-center">
        <p className="text-text-primary">{error ?? "Doctor not found"}</p>
      </div>
    );
  }

  const truncatedAbout =
    doctor.about.length > 120
      ? doctor.about.substring(0, 120) + "..."
      : doctor.about;

  return (
    <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <button
          onClick={toggleFavorite}
          className="p-2 rounded-full hover:bg-accent transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-shedula-danger text-shedula-danger"
                : "text-text-secondary"
            }`}
          />
        </button>
      </div>

      {/* Doctor Info */}
      <div className="px-4 pb-6">
        {/* Name, Role, Location */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-text-primary mb-1">
            {doctor.name}
          </h1>
          <p className="text-base font-medium text-shedula-brand mb-1">
            {doctor.role}
          </p>
          <div className="flex items-center justify-center space-x-1 text-sm text-text-secondary">
            <MapPin className="w-3 h-3" />
            <span>{doctor.hospital}</span>
          </div>
        </div>

        {/* Doctor Image */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={`https://images.unsplash.com/${doctor.image}?auto=format&fit=crop&w=96&h=96`}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="flex justify-around mb-8 bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="w-5 h-5 text-shedula-brand" />
            </div>
            <p className="text-sm font-semibold text-text-primary">{doctor.patients}</p>
            <p className="text-xs text-text-secondary">Patients</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Calendar className="w-5 h-5 text-shedula-brand" />
            </div>
            <p className="text-sm font-semibold text-text-primary">{doctor.experience}</p>
            <p className="text-xs text-text-secondary">Years Exp.</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Star className="w-5 h-5 text-shedula-brand" />
            </div>
            <p className="text-sm font-semibold text-text-primary">{doctor.rating}</p>
            <p className="text-xs text-text-secondary">Rating</p>
          </div>
        </div>

        {/* About Me */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-text-primary mb-3">
            About Me
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-2">
            {showFullAbout ? doctor.about : truncatedAbout}
          </p>
          {doctor.about.length > 120 && (
            <button
              onClick={() => setShowFullAbout((v) => !v)}
              className="text-sm text-shedula-brand font-medium"
            >
              {showFullAbout ? "View Less" : "View More"}
            </button>
          )}
        </div>

        {/* Qualification */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-text-primary">
              Qualification
            </span>
            <span className="text-sm text-text-secondary text-right flex-1 ml-4">
              {doctor.qualification}
            </span>
          </div>
        </div>

        {/* Service & Specialization */}
        <div className="mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-text-primary">Service</span>
            <Badge variant="outline" className="text-xs">
              {doctor.service}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-text-primary">Specialization</span>
            <Badge variant="outline" className="text-xs">
              {doctor.speciality}
            </Badge>
          </div>
        </div>

        {/* Consulting Availability */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-text-primary mb-3">
            Consulting Availability
          </h3>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-shedula-brand" />
              <span className="text-sm font-medium text-text-primary">
                {doctor.consultingDays}
              </span>
            </div>
            <div className="space-y-2">
              {doctor.consultingHours.map((time, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-text-secondary" />
                  <span className="text-sm text-text-secondary">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <Button
          onClick={handleBookAppointment}
          className="w-full h-12 bg-shedula-brand hover:bg-shedula-brand/90 text-white font-semibold text-base rounded-xl shadow-lg"
        >
          Book an Appointment
        </Button>
      </div>
    </div>
  );
}
