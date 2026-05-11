'use client';

import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, Command, Globe } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Try user@example.com / password");
      } else {
        toast.success("Welcome back!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--color-background)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', borderRadius: '50%',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', padding: '40px', borderRadius: '32px',
        backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '32px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            height: '48px', width: '48px', borderRadius: '14px', background: 'var(--color-primary)',
            margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(124,58,237,0.3)',
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }}>C</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '15px' }}>
            Sign in to access your personalized feed.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-muted-foreground)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-foreground)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
                style={{
                  width: '100%', padding: '14px 16px 14px 48px', borderRadius: '14px',
                  backgroundColor: 'var(--color-muted)', border: '2px solid transparent',
                  fontSize: '15px', outline: 'none', transition: 'border-color 0.2s',
                  color: 'var(--color-foreground)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-muted-foreground)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-foreground)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '14px 16px 14px 48px', borderRadius: '14px',
                  backgroundColor: 'var(--color-muted)', border: '2px solid transparent',
                  fontSize: '15px', outline: 'none', transition: 'border-color 0.2s',
                  color: 'var(--color-foreground)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
               <a href="#" style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '16px', borderRadius: '14px', backgroundColor: 'var(--color-primary)',
              color: 'white', border: 'none', fontSize: '16px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '10px', marginTop: '12px',
              boxShadow: '0 10px 25px -5px rgba(124,58,237,0.4)',
              transition: 'transform 0.2s, opacity 0.2s',
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
          <span style={{ fontSize: '13px', color: 'var(--color-muted-foreground)' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button style={{
            padding: '12px', borderRadius: '12px', border: '1px solid var(--color-border)',
            backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', cursor: 'pointer', color: 'var(--color-foreground)', fontWeight: '600', fontSize: '14px',
          }}>
            <Globe size={18} /> Google
          </button>
          <button style={{
            padding: '12px', borderRadius: '12px', border: '1px solid var(--color-border)',
            backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', cursor: 'pointer', color: 'var(--color-foreground)', fontWeight: '600', fontSize: '14px',
          }}>
            <Command size={18} /> GitHub
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-muted-foreground)' }}>
          Don&apos;t have an account? <Link href="/signup" style={{ color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'none' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
