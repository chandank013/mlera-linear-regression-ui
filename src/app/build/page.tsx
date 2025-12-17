"use client";

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';

const datasets = {
  "sales-revenue": {
    name: "Sales Revenue",
    description: "This dataset shows the relationship between marketing budget (in thousands of dollars) and sales revenue (in thousands of dollars). It demonstrates how increased marketing investment typically leads to higher sales revenue, making it ideal for understanding positive linear correlation in business contexts.",
    data: [
      { "Marketing Budget ($K)": 10, "Sales Revenue ($K)": 150 },
      { "Marketing Budget ($K)": 20, "Sales Revenue ($K)": 250 },
      { "Marketing Budget ($K)": 30, "Sales Revenue ($K)": 380 },
      { "Marketing Budget ($K)": 40, "Sales Revenue ($K)": 500 },
      { "Marketing Budget ($K)": 50, "Sales Revenue ($K)": 620 },
    ],
    columns: ["Marketing Budget ($K)", "Sales Revenue ($K)"]
  },
  "housing-price": {
    name: "Housing Price",
    description: "This dataset contains information about house prices and their features. It's a classic dataset for exploring how variables like square footage, number of bedrooms, and location influence the final sale price of a house.",
    data: [
        { "Square Footage": 1500, "Price ($)": 300000 },
        { "Square Footage": 1800, "Price ($)": 350000 },
        { "Square Footage": 2200, "Price ($)": 450000 },
        { "Square Footage": 2500, "Price ($)": 500000 },
        { "Square Footage": 3000, "Price ($)": 650000 },
    ],
    columns: ["Square Footage", "Price ($)"]
  },
  "salary-experience": {
    name: "Salary vs Experience",
    description: "This dataset illustrates the relationship between years of professional experience and annual salary (in dollars). It shows how career progression and accumulated experience typically result in higher compensation, making it excellent for understanding career growth patterns.",
    data: [
        { "Years of Experience": 1, "Salary ($)": 40000 },
        { "Years of Experience": 3, "Salary ($)": 48000 },
        { "Years of Experience": 5, "Salary ($)": 60000 },
        { "Years of Experience": 2, "Salary ($)": 45000 },
        { "Years of Experience": 8, "Salary ($)": 65000 },
        { "Years of Experience": 10, "Salary ($)": 75000 },
        { "Years of Experience": 12, "Salary ($)": 80000 },
        { "Years of Experience": 4, "Salary ($)": 50000 },
        { "Years of Experience": 9, "Salary ($)": 70000 },
        { "Years of Experience": 11, "Salary ($)": 78000 },
        { "Years of Experience": 6, "Salary ($)": 62000 },
        { "Years Experience": 15, "Salary ($)": 90000 },
        { "Years of Experience": 14, "Salary ($)": 85000 },
    ],
    columns: ["Years of Experience", "Salary ($)"]
  },
};

const chartConfig = {
  data: {
    label: "Data Points",
    color: "hsl(var(--chart-2))",
  },
};

export default function BuildPage() {
  const [selectedDataset, setSelectedDataset] = React.useState<keyof typeof datasets>("sales-revenue");
  const [showTable, setShowTable] = React.useState(false);

  const currentDataset = datasets[selectedDataset];

  const xKey = currentDataset.columns[0];
  const yKey = currentDataset.columns[1];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
      <header className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/learn">Learning Path</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Build Linear Regression</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-8">
          Build A Linear Regression Model
        </h1>

        <div className="flex justify-between items-center mb-8 gap-4">
          <div className="w-full">
            <p className="text-sm text-muted-foreground mb-2">Module progress: 3 / 5</p>
            <Progress value={60} className="h-2" />
          </div>
          <Link href="/learn">
            <Button variant="outline">
              <ChevronLeft className="mr-2" />
              Previous
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <Card className="bg-card">
            <CardContent className="p-6">
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                  1
                </span>
                Lets Build The Model
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In this interactive module, you&apos;ll build a linear regression model using different datasets. Select a dataset, adjust the learning rate and number of iterations, then click &quot;Build&quot; to train your model. Watch how the model converges as you navigate through the training process.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardContent className="p-6">
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                  2
                </span>
                Visualizing the Relationship
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dataset" className="text-sm font-medium">Select a Dataset:</Label>
                   <Select value={selectedDataset} onValueChange={(value) => setSelectedDataset(value as keyof typeof datasets)}>
                    <SelectTrigger id="dataset" className="w-full mt-2">
                      <SelectValue placeholder="Select a dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(datasets).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                   <Label className="text-sm font-medium text-muted-foreground">Dataset Description</Label>
                   <div className="mt-2 p-4 rounded-lg bg-secondary/50 border border-border">
                      <h3 className="font-semibold text-accent-foreground">{currentDataset.name} Dataset:</h3>
                      <p className="text-muted-foreground mt-1 leading-relaxed">{currentDataset.description}</p>
                   </div>
                </div>

                <p className="text-muted-foreground text-sm">Choose a dataset to see its scatter plot. This will help you understand the relationship between variables before building the model.</p>
                
                <Button className="w-full" variant="destructive" onClick={() => setShowTable(!showTable)}>
                  {showTable ? 'Hide' : 'View'} Dataset Table
                </Button>

                {showTable && (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-xl font-bold text-center">{currentDataset.name} Dataset</h3>
                    <Card className="border-primary/20">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-primary/90 hover:bg-primary/90">
                            {currentDataset.columns.map(col => (
                              <TableHead key={col} className="text-primary-foreground font-semibold">{col}</TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentDataset.data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                              {currentDataset.columns.map(col => (
                                <TableCell key={col}>{(row as any)[col]}</TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  </div>
                )}
                 <div className="mt-6 space-y-4">
                  <h3 className="text-xl font-bold text-center">{currentDataset.name} Preview</h3>
                   <Card className="overflow-hidden">
                    <CardContent className="bg-secondary/30 p-4">
                      <ChartContainer config={chartConfig} className="aspect-video h-[350px] w-full">
                        <ResponsiveContainer>
                          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey={xKey} name={xKey} />
                            <YAxis type="number" dataKey={yKey} name={yKey} />
                            <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                            <Legend />
                            <Scatter name="Data Points" data={currentDataset.data} fill="var(--color-data)" />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
