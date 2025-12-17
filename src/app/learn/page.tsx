"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Lightbulb } from "lucide-react";

export default function LearnPage() {
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
            <p className="text-sm text-muted-foreground mb-2">Module progress: 2 / 5</p>
            <Progress value={40} className="h-2" />
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
        </div>
      </main>
    </div>
  );
}
