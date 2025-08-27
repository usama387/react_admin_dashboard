import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Users, UserPlus, Activity, TrendingUp } from "lucide-react";

const barData = [
  { month: "Jan", users: 65, revenue: 4000 },
  { month: "Feb", users: 59, revenue: 3000 },
  { month: "Mar", users: 80, revenue: 5000 },
  { month: "Apr", users: 81, revenue: 4500 },
  { month: "May", users: 56, revenue: 3500 },
  { month: "Jun", users: 55, revenue: 4200 },
];

const lineData = [
  { day: "Mon", active: 120 },
  { day: "Tue", active: 132 },
  { day: "Wed", active: 101 },
  { day: "Thu", active: 134 },
  { day: "Fri", active: 90 },
  { day: "Sat", active: 230 },
  { day: "Sun", active: 210 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 20px rgba(220, 38, 38, 0.2)",
    transition: { duration: 0.3 },
  },
};

const Dashboard = () => {
  return (
    <div className="space-y-8 p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100 min-h-screen">
      {/* Top Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Users",
            value: "2,350",
            change: "+20.1% from last month",
            icon: Users,
          },
          {
            title: "New Users",
            value: "+180",
            change: "+15% from last month",
            icon: UserPlus,
          },
          {
            title: "Active Users",
            value: "1,240",
            change: "+5.2% from last month",
            icon: Activity,
          },
          {
            title: "Growth Rate",
            value: "12.5%",
            change: "+2.1% from last month",
            icon: TrendingUp,
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base sm:text-lg font-semibold text-red-600">
                  {item.title}
                </CardTitle>
                <item.icon className="h-5 w-5 text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">
                  {item.value}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                  {item.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-red-600">
                Monthly Overview
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                User growth and revenue trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: { label: "Users", color: "#dc2626" },
                  revenue: { label: "Revenue", color: "#f87171" },
                }}
                className="h-[250px] sm:h-[300px] md:h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="users" fill="#dc2626" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="revenue" fill="#f87171" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold text-red-600">
                Weekly Activity
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Daily active users this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  active: { label: "Active Users", color: "#dc2626" },
                }}
                className="h-[250px] sm:h-[300px] md:h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="#dc2626"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#dc2626" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
