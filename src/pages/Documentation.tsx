import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';
import { ChevronLeft, ArrowLeft } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={16} className="mr-1" />
            Back to Simulator
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground mb-6">
            Learn about hypothesis testing and how this application works
          </p>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="formulas">Formulas</TabsTrigger>
              <TabsTrigger value="technical">Technical Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>What is Hypothesis Testing?</CardTitle>
                  <CardDescription>
                    A statistical method used to make decisions based on data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    Hypothesis testing is a statistical method that allows researchers to use sample data to draw 
                    inferences about a population parameter. The process involves:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li>Formulating null (H₀) and alternative (H₁) hypotheses</li>
                    <li>Collecting sample data</li>
                    <li>Calculating a test statistic</li>
                    <li>Determining the probability (p-value) of obtaining the observed results</li>
                    <li>Making a decision to reject or fail to reject the null hypothesis</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Types of Hypothesis Tests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-medium mb-2">Two-tailed Test</h3>
                      <p className="text-sm text-muted-foreground">
                        Used when we want to determine if a parameter is different from a specified value 
                        (in either direction).
                      </p>
                      <div className="mt-2 text-center">
                        <InlineMath math="H_0: \mu = \mu_0" />
                        <br />
                        <InlineMath math="H_1: \mu \neq \mu_0" />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-medium mb-2">Left-tailed Test</h3>
                      <p className="text-sm text-muted-foreground">
                        Used when we want to determine if a parameter is less than a specified value.
                      </p>
                      <div className="mt-2 text-center">
                        <InlineMath math="H_0: \mu = \mu_0" />
                        <br />
                        <InlineMath math="H_1: \mu < \mu_0" />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h3 className="font-medium mb-2">Right-tailed Test</h3>
                      <p className="text-sm text-muted-foreground">
                        Used when we want to determine if a parameter is greater than a specified value.
                      </p>
                      <div className="mt-2 text-center">
                        <InlineMath math="H_0: \mu = \mu_0" />
                        <br />
                        <InlineMath math="H_1: \mu > \mu_0" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="formulas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Z-Test for a Population Mean</CardTitle>
                  <CardDescription>
                    Used when the population standard deviation is known
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    The z-test is used to determine if a sample mean differs significantly from a hypothesized population mean 
                    when the population standard deviation is known.
                  </p>
                  
                  <h3 className="font-medium mb-2">Test Statistic Formula:</h3>
                  <div className="bg-black/20 p-4 rounded-lg mb-4 overflow-x-auto">
                    <BlockMath math="z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}" />
                  </div>
                  
                  <p className="mb-3">where:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li><InlineMath math="\bar{x}" /> = sample mean</li>
                    <li><InlineMath math="\mu_0" /> = hypothesized population mean</li>
                    <li><InlineMath math="\sigma" /> = population standard deviation</li>
                    <li><InlineMath math="n" /> = sample size</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Critical Values and Decision Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <h3 className="font-medium mb-2">Two-tailed test (α = 0.05):</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Reject H₀ if |z| {'>'} 1.96</li>
                    <li>Fail to reject H₀ if |z| {'≤'} 1.96</li>
                  </ul>
                  
                  <h3 className="font-medium mb-2">Left-tailed test (α = 0.05):</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Reject H₀ if z {'<'} -1.645</li>
                    <li>Fail to reject H₀ if z {'≥'} -1.645</li>
                  </ul>
                  
                  <h3 className="font-medium mb-2">Right-tailed test (α = 0.05):</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Reject H₀ if z {'>'} 1.645</li>
                    <li>Fail to reject H₀ if z {'≤'} 1.645</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="technical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>How This Application Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    This application is built using modern web technologies to provide an interactive way to learn about
                    hypothesis testing:
                  </p>
                  
                  <h3 className="font-medium mt-4 mb-2">Technologies Used:</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>React for building the user interface</li>
                    <li>Framer Motion for smooth animations</li>
                    <li>D3.js for creating interactive data visualizations</li>
                    <li>KaTeX for rendering mathematical formulas</li>
                    <li>Tailwind CSS for styling</li>
                  </ul>
                  
                  <h3 className="font-medium mt-4 mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    <li>Interactive hypothesis test simulator</li>
                    <li>Real-time visualization of the sampling distribution</li>
                    <li>Support for different test types (two-tailed, left-tailed, right-tailed)</li>
                    <li>Animated transitions to show test statistic placement</li>
                    <li>Clear display of p-values and test decisions</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documentation;
