"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Play } from 'lucide-react';
import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Line, Legend, ResponsiveContainer } from "recharts";

const initialData = [
  { x: 10, y: 22 }, { x: 12, y: 25 }, { x: 15, y: 30 }, { x: 18, y: 34 },
  { x: 20, y: 40 }, { x: 22, y: 42 }, { x: 25, y: 50 }, { x: 28, y: 53 },
  { x: 30, y: 60 }, { x: 32, y: 66 }, { x: 35, y: 70 }, { x: 38, y: 74 },
];

const initialLine = [{x: 10, y: 20}, {x: 38, y: 78}];
const trainedLine = [{x: 10, y: 21.5}, {x: 38, y: 75.6}];

const chartConfig = {
  data: { label: "Data Points", color: "hsl(var(--accent))" },
  model: { label: "Model", color: "hsl(var(--primary))" },
};

export default function BuildPage() {
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(50);
  const [isTraining, setIsTraining] = useState(false);
  const [lineData, setLineData] = useState(initialLine);
  const [mse, setMse] = useState<number | null>(null);

  const handleTrain = () => {
    setIsTraining(true);
    setLineData(initialLine);
    setTimeout(() => {
      setLineData(trainedLine);
      setMse(calculateMSE(trainedLine));
      setIsTraining(false);
    }, 1500);
  };
  
  const calculateMSE = (line: {x: number, y: number}[]) => {
      const [p1, p2] = line;
      const slope = (p2.y - p1.y) / (p2.x - p1.x);
      const intercept = p1.y - slope * p1.x;
      let error = 0;
      initialData.forEach(point => {
          const predictedY = slope * point.x + intercept;
          error += Math.pow(point.y - predictedY, 2);
      });
      return parseFloat((error / initialData.length).toFixed(2));
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Build Your Own Model</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Adjust the hyperparameters and train your model to find the best fit for the data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Hyperparameters</CardTitle>
            <CardDescription>Tune these values to improve your model.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="learning-rate">Learning Rate</Label>
                <span className="font-mono text-primary">{learningRate}</span>
              </div>
              <Slider
                id="learning-rate"
                min={0.001}
                max={0.1}
                step={0.001}
                value={[learningRate]}
                onValueChange={(value) => setLearningRate(value[0])}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="epochs">Epochs</Label>
                <span className="font-mono text-primary">{epochs}</span>
              </div>
              <Slider
                id="epochs"
                min={10}
                max={200}
                step={10}
                value={[epochs]}
                onValueChange={(value) => setEpochs(value[0])}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleTrain} disabled={isTraining} className="w-full transition-all group">
                <Play className={`mr-2 h-4 w-4 ${isTraining ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
                {isTraining ? "Training..." : "Train Model"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Model Visualization</CardTitle>
            {mse !== null ? (
                <CardDescription>
                    Mean Squared Error: <span className="font-bold text-primary">{mse}</span>
                </CardDescription>
            ) : (
                <CardDescription>
                    Your model's performance on the dataset.
                </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="aspect-video h-[400px] w-full">
                <ResponsiveContainer>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="x" name="Feature" unit="" />
                        <YAxis type="number" dataKey="y" name="Target" unit="" />
                        <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                        <Legend />
                        <Scatter name="Data Points" data={initialData} fill="var(--color-data)" />
                        <Line type="monotone" dataKey="y" data={lineData} stroke="var(--color-model)" strokeWidth={3} dot={false} name="Model" />
                    </ScatterChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
