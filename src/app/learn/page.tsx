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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Check, ChevronLeft, Lightbulb, TriangleAlert, XIcon } from "lucide-react";
import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Line, Legend, ResponsiveContainer } from "recharts";
import React, { useState, useMemo } from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";


const scatterData = [
  { hours: 1, score: 42 },
  { hours: 2, score: 49 },
  { hours: 3, score: 45 },
  { hours: 4.2, score: 62 },
  { hours: 5, score: 72 },
  { hours: 5.5, score: 68 },
  { hours: 6, score: 75 },
  { hours: 7, score: 81 },
];

const bestFitLine = [
  { hours: 1, score: 40 },
  { hours: 7, score: 82 },
];

const chartConfig = {
  score: {
    label: "Exam Score",
  },
  studentData: {
    label: "Student Data",
    color: "hsl(var(--chart-2))",
  },
  bestFitLine: {
    label: "Best Fit Line",
    color: "hsl(var(--chart-1))",
  },
  yourLine: {
    label: "Your Regression Line",
    color: "hsl(var(--destructive))",
  },
};


export default function LearnPage() {
    const [intercept, setIntercept] = useState(31);
    const [slope, setSlope] = useState(6.2);

    const userLineData = useMemo(() => {
        const xValues = scatterData.map(d => d.hours);
        const minX = Math.min(...xValues, 0);
        const maxX = Math.max(...xValues, 10);
        return [
            { hours: minX, score: intercept + slope * minX },
            { hours: maxX, score: intercept + slope * maxX },
        ];
    }, [intercept, slope]);

    const mse = useMemo(() => {
        let error = 0;
        scatterData.forEach(point => {
            const predictedY = intercept + slope * point.hours;
            error += Math.pow(point.score - predictedY, 2);
        });
        return parseFloat((error / scatterData.length).toFixed(2));
    }, [intercept, slope]);

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
              <BreadcrumbPage>Content</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-8">
          Introduction to Linear Regression
        </h1>

        <div className="flex justify-between items-center mb-8 gap-4">
          <div className="w-full">
            <p className="text-sm text-muted-foreground mb-2">Module progress: 3 / 5</p>
            <Progress value={60} className="h-2" />
          </div>
          <Button variant="outline">
            <ChevronLeft className="mr-2" />
            Previous
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="bg-card">
            <CardContent className="p-6">
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                  1
                </span>
                What is Linear Regression?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Linear Regression is one of the most fundamental and widely used
                techniques in the field of machine learning and statistics. At
                its core, it&apos;s a method for modeling the relationship
                between a{" "}
                <span className="text-accent-foreground font-semibold">
                  dependent variable
                </span>{" "}
                (often denoted as Y) and one or more{" "}
                <span className="text-accent-foreground font-semibold">
                  independent variables
                </span>
                (X) by fitting a linear equation to the observed data.
              </p>
              <div className="mt-6 p-6 rounded-lg bg-secondary/50 border border-border relative">
                <div className="absolute -top-4 -left-4 bg-background p-1 rounded-full">
                    <div className="bg-yellow-400/20 text-yellow-400 p-2 rounded-full">
                        <Lightbulb className="h-5 w-5" />
                    </div>
                </div>
                <h3 className="font-semibold text-lg text-yellow-400 mb-2">Definition:</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Linear Regression is a{" "}
                  <span className="text-accent-foreground font-semibold">
                    supervised learning
                  </span>{" "}
                  algorithm that predicts a continuous output value based on one
                  or more input{" "}
                  <span className="text-accent-foreground font-semibold">
                    features
                  </span>
                  , assuming a linear relationship between the inputs and the
                  output.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-6">
                <h2 className="flex items-center text-2xl font-semibold mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                        2
                    </span>
                    Mathematical Formulation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    The simplest form of Linear Regression (Simple Linear Regression) can be expressed as:
                </p>
                <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center mb-6">
                    <p className="text-xl font-mono tracking-wider text-accent-foreground">
                        Y = β₀ + β₁X + ε
                    </p>
                </div>

                <div className="space-y-4 mb-6 relative pl-6">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                    <h3 className="font-semibold text-lg">Where:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">Y</span> is the dependent variable (what we&apos;re trying to predict)</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">X</span> is the independent variable (our input feature)</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">β₀</span> is the y-intercept (the value of Y when X = 0)</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">β₁</span> is the slope (how much Y changes when X increases by 1 unit)</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">ε</span> (epsilon) represents the error term (the part of Y that can&apos;t be explained by the model)</li>
                    </ul>
                </div>
                
                <div className="p-6 rounded-lg bg-secondary/50 border border-primary/50 relative">
                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg"></div>
                    <p className="text-muted-foreground leading-relaxed">
                        The goal of Linear Regression is to find the values of <span className="font-semibold text-accent-foreground">β₀</span> and <span className="font-semibold text-accent-foreground">β₁</span> that minimize the sum of squared differences between the actual <span className="font-semibold text-accent-foreground">Y</span> values and the values predicted by our model.
                    </p>
                </div>
            </CardContent>
          </Card>
           <Card className="bg-card">
            <CardContent className="p-6">
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                  3
                </span>
                Intuition behind LR
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Imagine you&apos;re trying to understand the relationship between study hours and exam scores. Intuitively, you might expect that more study hours lead to higher scores. Linear Regression formalizes this intuition by finding the straight line that best represents this relationship.
              </p>
              
              <Card className="overflow-hidden">
                <CardHeader className="p-4 bg-gradient-to-r from-pink-500 to-purple-600">
                  <CardTitle className="text-center text-white">Relationship Between Study Hours and Exam Scores</CardTitle>
                </CardHeader>
                <CardContent className="bg-secondary/30 p-4">
                    <ChartContainer config={chartConfig} className="aspect-video h-[350px] w-full">
                        <ResponsiveContainer>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="hours" name="Study Hours" unit="h" domain={[0, 8]} />
                                <YAxis type="number" dataKey="score" name="Exam Score" domain={[30, 90]} />
                                <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                                <Legend />
                                <Scatter name="Student Data" data={scatterData} fill="var(--color-studentData)" />
                                <Line 
                                    name="Best Fit Line"
                                    data={bestFitLine} 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="var(--color-bestFitLine)" 
                                    strokeWidth={2} 
                                    dot={false} 
                                />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
              </Card>

              <div className="text-muted-foreground leading-relaxed mt-6 space-y-4">
                <p>
                  In the visualization above, each point represents a student&apos;s study hours (x-axis) and their exam score (y-axis). The straight line is the <span className="text-accent-foreground font-semibold">&quot;best fit&quot;</span> line determined by Linear Regression, which minimizes the overall distance between the line and all data points.
                </p>
                <p>
                  If we know this relationship, we can make predictions. For example, if a student studies for 6 hours, we can use our regression line to predict their likely exam score.
                </p>
                <p>
                  Our goal in linear regression is to find the values of <span className="font-mono text-accent-foreground">β₀</span> and <span className="font-mono text-accent-foreground">β₁</span> (or all the <span className="font-mono text-accent-foreground">β</span> coefficients in multiple regression) that <span className="text-accent-foreground font-semibold">&quot;best fit&quot;</span> our data. But what does <span className="text-accent-foreground font-semibold">&quot;best fit&quot;</span> mean mathematically? That&apos;s where the cost function comes in.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
              <CardContent className="p-6">
                <h2 className="flex items-center text-2xl font-semibold mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                    4
                  </span>
                  Understanding the Cost Function (MSE)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  To find the best-fitting line, we need a way to measure how well any given line fits our data. The cost function quantifies how &quot;wrong&quot; our model&apos;s predictions are compared to the actual values. In linear regression, we typically use the Mean Squared Error (MSE) as our cost function.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  For a dataset with n observations, the MSE is calculated as:
                </p>
                
                <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center mb-6 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg"></div>
                    <p className="text-xl font-mono tracking-wider text-accent-foreground">
                        MSE = <sup>1</sup>&frasl;<sub>n</sub> &Sigma; (yᵢ - ŷᵢ)²
                    </p>
                </div>

                <div className="space-y-4 mb-6 relative pl-6">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                    <h3 className="font-semibold text-lg">Where:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">n</span> is the number of observations</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">yᵢ</span> is the actual value of the dependent variable for observation i</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">ŷᵢ</span> is the predicted value for observation i</li>
                    </ul>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Substituting our linear regression equation into MSE formula:
                </p>

                <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center mb-6 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg"></div>
                    <p className="text-xl font-mono tracking-wider text-accent-foreground">
                        MSE = <sup>1</sup>&frasl;<sub>n</sub> &Sigma; (yᵢ - (β₀ + β₁xᵢ))²
                    </p>
                </div>

                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    We&apos;ve defined the cost function (typically Mean Squared Error), the next step in Linear Regression is to minimize this error by finding the optimal values of the parameters:
                  </p>
                  <ul className="space-y-2 text-muted-foreground pl-4">
                      <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">β₀</span> (intercept)</li>
                      <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">β₁</span> (slope)</li>
                  </ul>
                  <p>There are two main techniques used to find these optimal parameters:</p>
                  <ol className="list-decimal list-inside text-accent-foreground font-semibold space-y-2">
                    <li>Ordinary Least Square (OLS)</li>
                    <li>Gradient Descent</li>
                  </ol>
                </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-6">
                <h2 className="flex items-center text-2xl font-semibold mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                        5
                    </span>
                    Ordinary Least Square (OLS)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    O.S is a <span className="text-accent-foreground font-semibold">closed-form analytical solution</span> derived by differenticting the cost function and setting the derivatives to zero. It gives a direct formula to compute the best-fitting line.
                </p>
                 <p className="text-muted-foreground leading-relaxed mb-6">
                    For a simple linear regression (one feature), the formulas are:
                </p>

                <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center mb-6 font-mono tracking-wider text-accent-foreground">
                    <p className="text-xl">
                        β₁ = <sup>&Sigma; (xᵢ - x̄)(yᵢ - ȳ)</sup> / <sub>&Sigma; (xᵢ - x̄)²</sub> = <sup>Cov(x,y)</sup> / <sub>Var(x)</sub>
                    </p>
                </div>
                <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center mb-6 font-mono tracking-wider text-accent-foreground">
                    <p className="text-xl">
                        β₀ = ȳ - β₁x̄
                    </p>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                   where <span className="font-mono text-accent-foreground">x̄</span> and <span className="font-mono text-accent-foreground">ȳ</span> are the means of the x and y values respectively.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-lg bg-green-500/10 border-l-4 border-green-500">
                        <h3 className="font-semibold text-lg text-green-400 mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5"/> Pros:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2"><Check className="text-green-500 mt-1 flex-shrink-0" /> Fast and exact</li>
                            <li className="flex items-start gap-2"><Check className="text-green-500 mt-1 flex-shrink-0" /> Best for small to medium datasets</li>
                        </ul>
                    </div>
                     <div className="p-6 rounded-lg bg-red-500/10 border-l-4 border-red-500">
                        <h3 className="font-semibold text-lg text-red-400 mb-4 flex items-center gap-2"><TriangleAlert className="w-5 h-5" /> Cons:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2"><XIcon className="text-red-500 mt-1 flex-shrink-0" /> Not ideal for high-dimensional data</li>
                            <li className="flex items-start gap-2"><XIcon className="text-red-500 mt-1 flex-shrink-0" /> Becomes computationally expensive when data is very large</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="p-6">
                <h2 className="flex items-center text-2xl font-semibold mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                        6
                    </span>
                    Gradient Descent
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    Gradient Descent is an <span className="text-accent-foreground font-semibold">iterative optimization algorithm</span>. It starts with random initial values for β₀ and β₁, and gradually updates them to minimize the cost.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                    The update rules are:
                </p>

                <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center mb-6 font-mono tracking-wider text-accent-foreground">
                    <p className="text-xl">
                    β₁ := β₁ - α <sup>∂J</sup>&frasl;<sub>∂β₁</sub> = β₁ - α <sup>1</sup>&frasl;<sub>m</sub> &Sigma; (ŷᵢ - yᵢ) &middot; xᵢ
                    </p>
                </div>
                <div className="p-6 rounded-lg bg-secondary/50 border border-border text-center mb-6 font-mono tracking-wider text-accent-foreground">
                    <p className="text-xl">
                    β₀ := β₀ - α <sup>∂J</sup>&frasl;<sub>∂β₀</sub> = β₀ - α <sup>1</sup>&frasl;<sub>m</sub> &Sigma; (ŷᵢ - yᵢ)
                    </p>
                </div>

                <div className="space-y-4 mb-6 relative pl-6">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                    <h3 className="font-semibold text-lg">Where:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">α</span> is the learning rate (step size)</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">m</span> is the number of training examples</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">ŷᵢ</span> is the predicted value for the i-th example</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">yᵢ</span> is the actual value for the i-th example</li>
                        <li><span className="text-primary font-mono mr-2">→</span> <span className="font-semibold text-accent-foreground">xᵢ</span> is the feature value for the i-th example</li>
                    </ul>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 my-6">
                    <div className="p-6 rounded-lg bg-green-500/10 border-l-4 border-green-500">
                        <h3 className="font-semibold text-lg text-green-400 mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5"/> Pros:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2"><Check className="text-green-500 mt-1 flex-shrink-0" /> Scales well to large datasets and high dimensions</li>
                            <li className="flex items-start gap-2"><Check className="text-green-500 mt-1 flex-shrink-0" /> Allows for online learning (data coming in streams)</li>
                        </ul>
                    </div>
                     <div className="p-6 rounded-lg bg-red-500/10 border-l-4 border-red-500">
                        <h3 className="font-semibold text-lg text-red-400 mb-4 flex items-center gap-2"><TriangleAlert className="w-5 h-5" /> Cons:</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2"><XIcon className="text-red-500 mt-1 flex-shrink-0" /> Requires tuning of learning rate</li>
                            <li className="flex items-start gap-2"><XIcon className="text-red-500 mt-1 flex-shrink-0" /> May get stuck in local minima (though MSE has a convex surface, so for linear regression, this is less of a problem)</li>
                        </ul>
                    </div>
                </div>

                <div className="p-6 rounded-lg bg-secondary/50 border-l-4 border-yellow-400/80">
                    <h3 className="font-semibold text-lg text-yellow-400 mb-2">Intuitive Explanation</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">Think of gradient descent as descending a hill to find the lowest point (minimum). At each step:</p>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                        <li>Look around to find the steepest downward direction (gradient)</li>
                        <li>Take a step in that direction (parameter update)</li>
                        <li>Repeat until you reach the bottom (convergence)</li>
                    </ol>
                </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
              <CardContent className="p-6">
                <h2 className="flex items-center text-2xl font-semibold mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4">
                    7
                  </span>
                  Visual Representation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Let&apos;s explore how changing the intercept and slope affects our regression line:
                </p>
                <Card className="overflow-hidden">
                    <CardHeader className="p-4 bg-secondary/50">
                        <CardTitle className="text-center text-primary">Adjust the Intercept and Slope to Fit the Data</CardTitle>
                    </CardHeader>
                    <CardContent className="bg-secondary/30 p-4">
                        <ChartContainer config={chartConfig} className="aspect-video h-[350px] w-full">
                            <ResponsiveContainer>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="hours" name="Study Hours" unit="h" domain={[0, 10]} />
                                    <YAxis type="number" dataKey="score" name="Exam Score" domain={[0, 100]} />
                                    <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Scatter name="Student Data" data={scatterData} fill="var(--color-studentData)" />
                                    <Line
                                        name="Your Regression Line"
                                        data={userLineData}
                                        type="monotone"
                                        dataKey="score"
                                        stroke="var(--color-yourLine)"
                                        strokeWidth={2}
                                        dot={false}
                                        />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4 p-4 bg-secondary/50">
                        <div className="w-full space-y-2">
                             <div className="flex justify-between items-center text-sm">
                                <Label htmlFor="intercept" className="text-muted-foreground">Intercept (β₀): <span className="font-bold text-primary">{intercept}</span></Label>
                            </div>
                            <Slider id="intercept" value={[intercept]} onValueChange={(v) => setIntercept(v[0])} min={-50} max={50} step={1} />
                        </div>
                        <div className="w-full space-y-2">
                             <div className="flex justify-between items-center text-sm">
                                <Label htmlFor="slope" className="text-muted-foreground">Slope (β₁): <span className="font-bold text-primary">{slope}</span></Label>
                            </div>
                            <Slider id="slope" value={[slope]} onValueChange={(v) => setSlope(v[0])} min={-10} max={20} step={0.5} />
                        </div>
                        <div className="w-full text-center">
                            <p className="text-muted-foreground">Mean Squared Error: <span className="font-bold text-lg text-destructive">{mse}</span></p>
                        </div>
                        <div className="mt-4 text-muted-foreground text-sm space-y-2">
                            <p>As you adjust the sliders, observe how the regression line changes:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>The intercept moves the line up or down (where it crosses the y-axis)</li>
                                <li>The slope changes how steep the line is (positive slopes go up, negative slopes go down)</li>
                            </ul>
                        </div>
                        <div className="mt-4 p-4 rounded-lg bg-accent border-l-4 border-primary">
                            <p className="text-sm text-accent-foreground">Notice that some lines fit the data better than others. The best line is the one that minimizes the total error between the line and the actual data points.</p>
                        </div>
                    </CardFooter>
                </Card>
              </CardContent>
          </Card>
        </div>

        <div className="mt-12">
            <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <p className="text-sm font-semibold text-primary">Coming Up Next:</p>
                    <h3 className="text-2xl font-bold mt-1">Build a Linear Regression Model</h3>
                    <p className="text-muted-foreground mt-2">Now that the theory is clear, build an interactive model.</p>
                </div>
                <Link href="/build" className="mt-4 md:mt-0">
                    <Button>
                    Continue <ArrowRight className="ml-2" />
                    </Button>
                </Link>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
