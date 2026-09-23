'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  originalPrice?: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
  buttonStyle: string;
  badge?: string;
  savings?: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with your wellness journey',
    features: [
      { name: 'Interactive anatomy diagram', included: true },
      { name: 'Exercise library (10 exercises)', included: true },
      { name: 'Basic wellness tracking', included: true },
      { name: 'Community access', included: true },
      { name: 'Personal journal (5 entries/month)', included: true },
      { name: 'Advanced workout plans', included: false },
      { name: 'Personalized nutrition guidance', included: false },
      { name: 'Progress analytics & insights', included: false },
      { name: 'Priority customer support', included: false },
      { name: 'Offline access & downloads', included: false }
    ],
    buttonText: 'Start Free',
    buttonStyle: 'btn-outline'
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 12.99,
    period: 'month',
    originalPrice: 19.99,
    savings: 'Save 35%',
    description: 'Advanced features for serious fitness enthusiasts',
    features: [
      { name: 'Full interactive anatomy with muscle details', included: true },
      { name: 'Complete exercise library (300+ exercises)', included: true },
      { name: 'Advanced wellness tracking & metrics', included: true },
      { name: 'Premium community access', included: true },
      { name: 'Unlimited personal journal with insights', included: true },
      { name: 'Personalized AI workout plans', included: true },
      { name: 'Basic nutrition guidance & meal tracking', included: true },
      { name: 'Progress analytics & detailed reports', included: true },
      { name: 'Email & chat support', included: true },
      { name: 'Offline access & downloads', included: false }
    ],
    buttonText: 'Start 14-Day Free Trial',
    buttonStyle: 'btn-primary'
  },
  {
    id: 'plus',
    name: 'Premium',
    price: 24.99,
    period: 'month',
    originalPrice: 39.99,
    savings: 'Save 38%',
    description: 'Complete wellness solution with AI-powered insights',
    popular: true,
    badge: 'Most Popular',
    features: [
      { name: 'Advanced 3D anatomy with detailed explanations', included: true },
      { name: 'Unlimited exercise library with video guides', included: true },
      { name: 'AI-powered wellness tracking & predictions', included: true },
      { name: 'VIP community access & expert sessions', included: true },
      { name: 'Smart journal with AI analysis & recommendations', included: true },
      { name: 'Custom AI workout plans with adaptations', included: true },
      { name: 'Complete nutrition suite with meal planning', included: true },
      { name: 'Advanced analytics with health insights', included: true },
      { name: 'Priority support with 2-hour response', included: true },
      { name: 'Full offline access & premium downloads', included: true }
    ],
    buttonText: 'Start 14-Day Free Trial',
    buttonStyle: 'btn-secondary'
  },
  {
    id: 'platinum',
    name: 'Enterprise',
    price: 49.99,
    period: 'month',
    originalPrice: 79.99,
    savings: 'Save 37%',
    description: 'Ultimate wellness package with dedicated support',
    badge: 'Best Value',
    features: [
      { name: 'Professional 3D anatomy with medical references', included: true },
      { name: 'Unlimited premium content & exclusive exercises', included: true },
      { name: 'AI health assistant with predictive analytics', included: true },
      { name: 'Private community access & 1-on-1 expert calls', included: true },
      { name: 'AI-powered journal with health trend analysis', included: true },
      { name: 'Personal trainer AI with live form correction', included: true },
      { name: 'Personal nutritionist AI with custom meal plans', included: true },
      { name: 'Comprehensive health dashboard & monthly reports', included: true },
      { name: 'Dedicated support manager & phone support', included: true },
      { name: 'Premium offline access & early feature access', included: true }
    ],
    buttonText: 'Start 14-Day Free Trial',
    buttonStyle: 'gradient-accent'
  }
];

const paymentProviders = [
  {
    id: 'stripe',
    name: 'Stripe',
    logo: (
      <svg className="w-20 h-8" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M59.5 12.5c0-6.9-5.6-12.5-12.5-12.5S34.5 5.6 34.5 12.5 40.1 25 47 25s12.5-5.6 12.5-12.5z" fill="#6772E5"/>
        <path d="M47 8.5c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="white"/>
        <path d="M25.5 6.5v12h-3v-12h3zm-6 0v12h-3v-12h3zm-6 0v12h-3v-12h3zm-6 0v12h-3v-12h3z" fill="#6772E5"/>
      </svg>
    ),
    description: 'Secure credit card processing',
    features: ['Visa', 'Mastercard', 'American Express', 'Discover'],
    url: 'https://js.stripe.com/v3/',
    testMode: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: (
      <svg className="w-20 h-8" viewBox="0 0 101 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9 3.2c2.3-1.5 5.2-2.3 8.2-2.3h14.6c3.7 0 6.5.8 8.4 2.4 1.9 1.6 2.8 4 2.8 7.2 0 4.8-1.2 8.4-3.6 10.8-2.4 2.4-5.9 3.6-10.5 3.6H22.7l-1.8 8.1H12l7.9-29.8z" fill="#003087"/>
        <path d="M22.7 14.9h10.1c1.5 0 2.6-.3 3.3-1 .7-.7 1-1.7 1-3s-.3-2.3-1-3c-.7-.7-1.8-1-3.3-1H22.7l-1.8 8z" fill="#0070BA"/>
        <path d="M69.8 3.2c2.3-1.5 5.2-2.3 8.2-2.3h14.6c3.7 0 6.5.8 8.4 2.4 1.9 1.6 2.8 4 2.8 7.2 0 4.8-1.2 8.4-3.6 10.8-2.4 2.4-5.9 3.6-10.5 3.6H79.6l-1.8 8.1H68.9l7.9-29.8z" fill="#003087"/>
      </svg>
    ),
    description: 'PayPal secure checkout',
    features: ['PayPal Balance', 'Credit Cards', 'Bank Account', 'PayPal Credit'],
    url: 'https://www.paypal.com/sdk/js',
    testMode: true
  },
  {
    id: 'mercadopago',
    name: 'MercadoPago',
    logo: (
      <svg className="w-20 h-8" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="120" height="32" rx="6" fill="#009EE3"/>
        <path d="M20 8h80v16H20z" fill="white"/>
        <text x="60" y="20" textAnchor="middle" className="text-sm font-bold" fill="#009EE3">MercadoPago</text>
      </svg>
    ),
    description: 'Latin America payment solution',
    features: ['PIX', 'Credit Cards', 'Bank Transfer', 'Boleto Bancário'],
    url: 'https://sdk.mercadopago.com/js/v2',
    testMode: true
  }
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<string>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlanSelection = (planId: string) => {
    if (planId === 'free') {
      // Simulate free account creation
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        alert('Welcome to WellnessHub! Your free account has been created successfully.');
      }, 1500);
      return;
    }

    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePayment = async () => {
    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    const provider = paymentProviders.find(p => p.id === selectedPaymentProvider);

    if (!plan || !provider) return;

    setIsProcessing(true);

    // Simulate payment processing with realistic delays
    try {
      // Load payment provider SDK (simulated)
      console.log(`Loading ${provider.name} SDK from ${provider.url}`);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful payment
      alert(`Payment successful! Welcome to WellnessHub ${plan.name}!\n\nTransaction ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}\nAmount: $${plan.price}/${plan.period}\nProvider: ${provider.name}`);

      setShowPayment(false);
      setSelectedPlan(null);
    } catch (error) {
      alert('Payment failed. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg-clean">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 subtle-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-custom mb-6 leading-tight">
            Transform Your <span className="gradient-text-primary">Wellness Journey</span>
          </h1>
          <p className="text-xl text-secondary-custom max-w-3xl mx-auto mb-8">
            Join over 50,000 users who have revolutionized their health with our AI-powered wellness platform.
            Choose the plan that fits your goals.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-secondary-custom">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              14-day free trial
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Money-back guarantee
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative card-clean rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  plan.popular ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`px-6 py-2 rounded-full text-sm font-semibold text-white ${
                      plan.popular ? 'gradient-secondary' : 'gradient-accent'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {plan.savings}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary-custom mb-4">{plan.name}</h3>

                  <div className="mb-4">
                    {plan.originalPrice && (
                      <div className="text-lg text-gray-400 line-through mb-1">
                        ${plan.originalPrice}/{plan.period}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-primary-custom">
                        ${plan.price}
                      </span>
                      <span className="text-secondary-custom ml-2">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-secondary-custom text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                        feature.included
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          {feature.included ? (
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      </div>
                      <span className={`text-sm leading-relaxed ${
                        feature.included ? 'text-primary-custom' : 'text-gray-400'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelection(plan.id)}
                  disabled={isProcessing}
                  className={`w-full ${plan.buttonStyle} py-4 px-6 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isProcessing && selectedPlan === plan.id ? 'Processing...' : plan.buttonText}
                </button>

                {plan.id !== 'free' && (
                  <p className="text-center text-xs text-secondary-custom mt-3">
                    No commitment • Cancel anytime
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayment && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="card-clean rounded-2xl p-8 max-w-lg w-full animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary-custom">Secure Checkout</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
              >
                ×
              </button>
            </div>

            {/* Selected Plan Summary */}
            {(() => {
              const plan = subscriptionPlans.find(p => p.id === selectedPlan);
              return plan ? (
                <div className="mb-8 p-6 subtle-gradient rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-primary-custom text-lg">{plan.name} Plan</h4>
                    {plan.savings && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      {plan.originalPrice && (
                        <span className="text-gray-400 line-through text-sm mr-2">
                          ${plan.originalPrice}/{plan.period}
                        </span>
                      )}
                      <span className="text-secondary-custom">Billed monthly</span>
                    </div>
                    <span className="text-3xl font-bold text-primary-custom">
                      ${plan.price}/{plan.period}
                    </span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>14-day free trial</strong> • You'll be charged ${plan.price} after your trial ends. Cancel anytime during the trial period.
                    </p>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Payment Provider Selection */}
            <div className="mb-8">
              <h4 className="font-semibold text-primary-custom mb-4 text-lg">Choose Payment Method</h4>
              <div className="space-y-3">
                {paymentProviders.map((provider) => (
                  <label
                    key={provider.id}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedPaymentProvider === provider.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentProvider"
                      value={provider.id}
                      checked={selectedPaymentProvider === provider.id}
                      onChange={(e) => setSelectedPaymentProvider(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="mr-4">
                          {provider.logo}
                        </div>
                        <div>
                          <div className="font-medium text-primary-custom">{provider.name}</div>
                          <div className="text-sm text-secondary-custom">{provider.description}</div>
                          <div className="text-xs text-secondary-custom mt-1">
                            {provider.features.join(' • ')}
                          </div>
                        </div>
                      </div>
                      {provider.testMode && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                          Test Mode
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Actions */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setShowPayment(false)}
                disabled={isProcessing}
                className="flex-1 btn-outline py-3 px-4 rounded-lg font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 btn-primary py-3 px-4 rounded-lg font-semibold disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Start Free Trial'}
              </button>
            </div>

            {/* Security & Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-700 font-medium">
                  256-bit SSL encryption • PCI DSS compliant
                </span>
              </div>

              <div className="text-center text-xs text-secondary-custom">
                By proceeding, you agree to our{' '}
                <Link href="/terms" className="text-primary-custom hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary-custom hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-custom mb-12">
            Trusted by wellness enthusiasts worldwide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-custom mb-2">50K+</div>
              <div className="text-secondary-custom">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-custom mb-2">4.9★</div>
              <div className="text-secondary-custom">App Store Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-custom mb-2">95%</div>
              <div className="text-secondary-custom">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-custom text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-clean rounded-xl p-6">
              <h3 className="font-semibold text-primary-custom mb-3 text-lg">How does the free trial work?</h3>
              <p className="text-secondary-custom">
                Start your 14-day free trial with full access to all premium features. No credit card required.
                Cancel anytime during the trial period with no charges.
              </p>
            </div>

            <div className="card-clean rounded-xl p-6">
              <h3 className="font-semibold text-primary-custom mb-3 text-lg">Can I change my plan anytime?</h3>
              <p className="text-secondary-custom">
                Yes! Upgrade or downgrade your subscription at any time from your account settings.
                Changes take effect at your next billing cycle.
              </p>
            </div>

            <div className="card-clean rounded-xl p-6">
              <h3 className="font-semibold text-primary-custom mb-3 text-lg">What payment methods do you accept?</h3>
              <p className="text-secondary-custom">
                We accept all major credit cards through Stripe, PayPal payments, and MercadoPago for
                Latin American users. All transactions are secured with bank-level encryption.
              </p>
            </div>

            <div className="card-clean rounded-xl p-6">
              <h3 className="font-semibold text-primary-custom mb-3 text-lg">Is there a money-back guarantee?</h3>
              <p className="text-secondary-custom">
                Absolutely! We offer a 30-day money-back guarantee. If you're not satisfied with our
                platform, contact us for a full refund within 30 days of purchase.
              </p>
            </div>

            <div className="card-clean rounded-xl p-6">
              <h3 className="font-semibold text-primary-custom mb-3 text-lg">Do you offer student discounts?</h3>
              <p className="text-secondary-custom">
                Yes! Students with a valid .edu email address receive 50% off all paid plans.
                Contact our support team to verify your student status and apply the discount.
              </p>
            </div>

            <div className="card-clean rounded-xl p-6">
              <h3 className="font-semibold text-primary-custom mb-3 text-lg">What happens to my data if I cancel?</h3>
              <p className="text-secondary-custom">
                Your data remains secure and accessible for 90 days after cancellation. You can
                export your wellness data anytime, and reactivate your account to restore full access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gradient-primary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who have revolutionized their wellness journey with our AI-powered platform.
          </p>
          <button
            onClick={() => handlePlanSelection('plus')}
            className="bg-white text-primary-custom px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 text-lg"
          >
            Start Your 14-Day Free Trial
          </button>
          <p className="text-white/80 text-sm mt-4">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}