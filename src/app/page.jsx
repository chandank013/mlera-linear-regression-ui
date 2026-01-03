import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, LineChart, Table2 } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

const content = [
  {
    icon: BrainCircuit,
    title: "What is Linear Regression?",
    description: "The foundational algorithm.",
    body: "Linear regression is a statistical method used to model the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data.",
    href: "/learn"
  },
  {
    icon: LineChart,
    title: "The Core Concept",
    description: "Finding the best fit.",
    body: "The goal is to find the straight line (hyperplane in higher dimensions) that best predicts the output `y` from the input `x`. This line is defined by its slope and intercept.",
    href: "/learn"
  },
  {
    icon: Table2,
    title: "Build your own",
    description: "From finance to biology.",
    body: "It's widely used for predicting outcomes like stock prices, sales forecasts, crop yields, and medical diagnoses based on historical data and relevant factors.",
    href: "/build"
  },
];

const heroImage = placeholderImages.find(p => p.id === 'hero-abstract');

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full py-20 md:py-32 lg:py-40 text-center bg-card border-b">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-5 dark:opacity-10"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-primary via-foreground/80 to-primary bg-clip-text text-transparent">
              Master Linear Regression
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              An interactive introduction to one of the most fundamental concepts in machine learning. Understand the theory, then build it yourself.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/learn">
                <Button size="lg">
                  Start Learning <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/build">
                <Button size="lg" variant="outline">
                  Build a Model
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Core Concepts</h2>
            <p className="text-muted-foreground mt-2">
              Start with the basics. Solidify your understanding of how linear regression works.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.map((item, index) => (
              <Link href={item.href} key={index}>
                <Card  className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-accent/20 rounded-full">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{item.body}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
