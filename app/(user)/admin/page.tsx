"use client";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, Pie, PieChart, Label } from "recharts";
import SampleTable from "@/components/common/table";
import PageWrapper from "@/components/pageWrapper";
import { useRouter } from "next/navigation";
import { ListFilter, Trees, ScanQrCode, Settings, Leaf, Menu, X, Radar, HeartPulse, MoreHorizontal, Download, Filter, Calendar as CalendarIcon } from 'lucide-react'
import Link from "next/link";

// Sample data for charts
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

// Chart Configuration
const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("This Week");
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <PageWrapper>
      {/* Welcome Card */}
      <Card className="bg-primary border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">
            Welcome back, User
          </CardTitle>
          <CardDescription className="text-white mt-2">
            Here is your farm health overview as of {currentDate}
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-4">
          <Link href="/admin/scan" className="inline-flex items-center justify-center rounded-md bg-white text-black h-8 px-4 py-2">
            Scan New Trees
          </Link>
        </CardFooter>
      </Card>

      {/* Filter and Actions */}
      <div className="flex flex-col md:flex-row items-end justify-end">
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-2">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
          </Button>
          <Button variant="default" className="gap-2">
            <Download className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Mango Trees", value: "320", icon: Trees },
          { title: "Images Analyzed", value: "1,543", icon: ScanQrCode },
          { title: "Diseases Detected", value: "287", icon: Radar },
          { title: "Healthy Trees", value: "76%", icon: HeartPulse },
        ].map((item, index) => (
          <Card key={index} className="p-4 rounded-lg space-y-1">
            <h1 className="text-2xl font-medium flex items-center gap-2">
              <item.icon className="text-primary" />
              <span>{item.value}</span>
            </h1>
            <h1 className="text-sm text-muted-foreground">{item.title}</h1>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="w-full flex flex-col lg:flex-row gap-2 md:gap-4">
        <DiseaseTrendLineChart />
        <AnalysisStatus />
      </div>

      {/* Sample Table */}
      <div className="flex">
        <SampleTable />
      </div>
    </PageWrapper>
  );
};

// Line Chart Component
const DiseaseTrendLineChart = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
        </LineChart>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Pie Chart Component
const AnalysisStatus = () => {
  const totalVisitors = useMemo(() => pieChartData.reduce((acc, curr) => acc + curr.visitors, 0), []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <PieChart>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                      Visitors
                    </tspan>
                  </text>
                );
              }
            }}
          />
          <Pie data={pieChartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5} />
        </PieChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;
