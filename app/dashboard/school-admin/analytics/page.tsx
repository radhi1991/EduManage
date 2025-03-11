"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

// Mock data for teacher performance
const initialTeacherData = [
  { id: 1, name: "John Smith", averageStudentScore: 85, classEngagement: 90, teachingEffectiveness: 88 },
  { id: 2, name: "Sarah Johnson", averageStudentScore: 78, classEngagement: 85, teachingEffectiveness: 82 },
  { id: 3, name: "Michael Brown", averageStudentScore: 92, classEngagement: 95, teachingEffectiveness: 94 },
  { id: 4, name: "Emily Davis", averageStudentScore: 88, classEngagement: 92, teachingEffectiveness: 90 },
  { id: 5, name: "David Wilson", averageStudentScore: 76, classEngagement: 80, teachingEffectiveness: 78 },
]

// Simple ML function to generate improvement strategies
const generateImprovementStrategy = (teacher) => {
  const strategy = []

  if (teacher.averageStudentScore < 80) {
    strategy.push("Focus on improving student academic performance")
  }

  if (teacher.classEngagement < 85) {
    strategy.push("Implement more interactive teaching methods to boost class engagement")
  }

  if (teacher.teachingEffectiveness < 85) {
    strategy.push("Attend professional development workshops to enhance teaching skills")
  }

  return strategy.length > 0 ? strategy : ["Continue current successful teaching practices"]
}

export default function SchoolAnalyticsDashboard() {
  const [teacherData, setTeacherData] = useState(initialTeacherData)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  // Simulating AI/ML analysis
  useEffect(() => {
    const analyzedData = teacherData.map((teacher) => ({
      ...teacher,
      improvementStrategy: generateImprovementStrategy(teacher),
      overallPerformance: (teacher.averageStudentScore + teacher.classEngagement + teacher.teachingEffectiveness) / 3,
    }))
    setTeacherData(analyzedData)
  }, [])

  return (
    <DashboardLayout title="School Analytics Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Teacher Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teacherData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageStudentScore" fill="#8884d8" name="Avg Student Score" />
                <Bar dataKey="overallPerformance" fill="#82ca9d" name="Overall Performance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Teaching Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teacherData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="classEngagement" fill="#8884d8" name="Class Engagement" />
                <Bar dataKey="teachingEffectiveness" fill="#82ca9d" name="Teaching Effectiveness" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Teacher Details and Improvement Strategies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {teacherData.map((teacher) => (
              <Button
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                variant={selectedTeacher?.id === teacher.id ? "default" : "outline"}
              >
                {teacher.name}
              </Button>
            ))}
          </div>
          {selectedTeacher && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">{selectedTeacher.name}'s Details</h3>
              <p>
                <strong>Average Student Score:</strong> {selectedTeacher.averageStudentScore}
              </p>
              <p>
                <strong>Class Engagement:</strong> {selectedTeacher.classEngagement}
              </p>
              <p>
                <strong>Teaching Effectiveness:</strong> {selectedTeacher.teachingEffectiveness}
              </p>
              <p>
                <strong>Overall Performance:</strong> {selectedTeacher.overallPerformance.toFixed(2)}
              </p>
              <h4 className="text-md font-semibold mt-4 mb-2">Improvement Strategy:</h4>
              <ul className="list-disc pl-5">
                {selectedTeacher.improvementStrategy.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

