"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

// Mock data for student performance
const initialStudentData = [
  { id: 1, name: "Alice", averageScore: 85, timeSpent: 120, participation: 90 },
  { id: 2, name: "Bob", averageScore: 78, timeSpent: 100, participation: 75 },
  { id: 3, name: "Charlie", averageScore: 92, timeSpent: 150, participation: 95 },
  { id: 4, name: "David", averageScore: 68, timeSpent: 80, participation: 60 },
  { id: 5, name: "Eve", averageScore: 88, timeSpent: 130, participation: 85 },
]

// Simple ML function to generate improvement plans
const generateImprovementPlan = (student) => {
  const plan = []

  if (student.averageScore < 75) {
    plan.push("Focus on improving overall subject knowledge")
  }

  if (student.timeSpent < 100) {
    plan.push("Increase study time to at least 2 hours per week")
  }

  if (student.participation < 80) {
    plan.push("Encourage more active participation in class discussions")
  }

  return plan.length > 0 ? plan : ["Keep up the good work!"]
}

export default function TeacherAnalyticsDashboard() {
  const [studentData, setStudentData] = useState(initialStudentData)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Simulating AI/ML analysis
  useEffect(() => {
    const analyzedData = studentData.map((student) => ({
      ...student,
      improvementPlan: generateImprovementPlan(student),
      predictedScore: Math.min(100, student.averageScore + student.timeSpent / 60 + student.participation / 10),
    }))
    setStudentData(analyzedData)
  }, [])

  return (
    <DashboardLayout title="Teacher Analytics Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Class Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageScore" fill="#8884d8" name="Average Score" />
                <Bar dataKey="predictedScore" fill="#82ca9d" name="Predicted Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="timeSpent" fill="#8884d8" name="Time Spent (minutes)" />
                <Bar dataKey="participation" fill="#82ca9d" name="Participation (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Student Details and Improvement Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {studentData.map((student) => (
              <Button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                variant={selectedStudent?.id === student.id ? "default" : "outline"}
              >
                {student.name}
              </Button>
            ))}
          </div>
          {selectedStudent && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">{selectedStudent.name}'s Details</h3>
              <p>
                <strong>Average Score:</strong> {selectedStudent.averageScore}
              </p>
              <p>
                <strong>Time Spent:</strong> {selectedStudent.timeSpent} minutes
              </p>
              <p>
                <strong>Participation:</strong> {selectedStudent.participation}%
              </p>
              <p>
                <strong>Predicted Score:</strong> {selectedStudent.predictedScore.toFixed(2)}
              </p>
              <h4 className="text-md font-semibold mt-4 mb-2">Improvement Plan:</h4>
              <ul className="list-disc pl-5">
                {selectedStudent.improvementPlan.map((item, index) => (
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

