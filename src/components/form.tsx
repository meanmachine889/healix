"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Form() {
  const {toast} = useToast();
  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formState, setFormState] = useState({
    nctId: "",
    studyTitle: "",
    conditions: "",
    interventions: "",
    enrollment: "",
    phases: "",
    studyType: "",
    studyDesign: "",
    startDate: "",
    primaryCompletionDate: "",
    locations: "",
  });

  const [predictedData, setPredictedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        nct_id: formState.nctId,
        Study_Title: formState.studyTitle,
        Conditions: formState.conditions,
        Interventions: formState.interventions,
        Phases: formState.phases.toUpperCase(),
        Enrollment: Number(formState.enrollment),
        Study_Type: formState.studyType.toUpperCase(),
        Study_Design: formState.studyDesign,
        Start_Date: formatDate(formState.startDate),
        Primary_Completion_Date: formatDate(formState.primaryCompletionDate),
        Locations: formState.locations,
      };
      setLoading(true);
      const response = await fetch("https://usual-kathie-respro-c027f147.koyeb.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      if(response.status === 200) {
        const data = await response.json();
        setPredictedData(data.predicted_completion_date);
        toast({ 
          title: "Result",
          description: "Prediction Successful",
        });
      } else {
        toast({
          title: "Result",
          description: "Prediction Failed",
        });
      }
    } catch (error) {
      setError(true);
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-col gap-5 flex h-fit">
      <div className="rounded-xl border bg-zinc-900">
        <div className="p-5">
          <p className="text-lg text-gray-400 mb-3">
            Predicted Completion Date
          </p>
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : predictedData ? (
            <p className="text-3xl text-green-400">{predictedData}</p>
          ) : error ? (
            <p className="text-3xl text-red-400">Error</p>
          ) : (
            <p className="text-3xl text-gray-400">No Data Available</p>
          )}
        </div>
      </div>
      <div className="w-full h-fit px-5 border rounded-xl p-5">
        <div className="space-y-6 h-fit">
          <div className="flex justify-between w-[100%]">
            <p className="self-start text-3xl">Trial Details</p>
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="font-medium bg-zinc-800 shadow-md hover:bg-zinc-900 text-gray-400"
            >
              {loading ? "Predicting..." : "Predict"}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="nctId"
                className="text-lg font-normal text-zinc-500"
              >
                NCT ID
              </Label>
              <Input
                id="nctId"
                value={formState.nctId}
                onChange={handleInputChange}
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter NCT ID"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="studyTitle"
                className="text-lg font-normal text-zinc-500"
              >
                Study Title
              </Label>
              <Input
                id="studyTitle"
                value={formState.studyTitle}
                onChange={handleInputChange}
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Study Title"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="conditions"
                className="text-lg font-normal text-zinc-500"
              >
                Conditions
              </Label>
              <Input
                id="conditions"
                value={formState.conditions}
                onChange={handleInputChange}
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Conditions (e.g., Diabetes)"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="interventions"
                className="text-lg font-normal text-zinc-500"
              >
                Interventions
              </Label>
              <Input
                id="interventions"
                value={formState.interventions}
                onChange={handleInputChange}
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Interventions (e.g., Drug A)"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="enrollment"
                className="text-lg font-normal text-zinc-500"
              >
                Enrollment
              </Label>
              <Input
                id="enrollment"
                value={formState.enrollment}
                onChange={handleInputChange}
                type="number"
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Enrollment Number"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phases"
                className="text-lg font-normal text-zinc-500"
              >
                Phases
              </Label>
              <Input
                id="phases"
                value={formState.phases}
                onChange={handleInputChange}
                type="text"
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Phase (e.g., Phase 1)"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="studyType"
                className="text-lg font-normal text-zinc-500"
              >
                Study Type
              </Label>
              <Input
                id="studyType"
                value={formState.studyType}
                onChange={handleInputChange}
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Study Type (e.g., Interventional)"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="studyDesign"
                className="text-lg font-normal text-zinc-500"
              >
                Study Design
              </Label>
              <Input
                id="studyDesign"
                value={formState.studyDesign}
                onChange={handleInputChange}
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Study Design"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="startDate"
                className="text-lg font-normal text-zinc-500"
              >
                Start Date
              </Label>
              <Input
                id="startDate"
                value={formState.startDate}
                onChange={handleInputChange}
                type="date"
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Select Start Date"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="primaryCompletionDate"
                className="text-lg font-normal text-zinc-500"
              >
                Primary Completion Date
              </Label>
              <Input
                id="primaryCompletionDate"
                value={formState.primaryCompletionDate}
                onChange={handleInputChange}
                type="date"
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Select Primary Completion Date"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="locations"
                className="text-lg font-normal text-zinc-500"
              >
                Locations
              </Label>
              <Input
                id="locations"
                value={formState.locations}
                onChange={handleInputChange}
                className="placeholder:text-lg h-16 placeholder:text-gray-500"
                placeholder="Enter Locations"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
