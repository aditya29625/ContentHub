'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully! Please login.");
      router.push("/login");
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--color-background)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', borderRadius: '50%',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', padding: '40px', borderRadius: '32px',
        backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '32px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Create Account</h1>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '15px' }}>
            Join ContentHub and start personalizing your feed.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-muted-foreground)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-foreground)' }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
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
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-muted-foreground)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-foreground)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
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
                minLength={8}
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
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <>Sign Up <ArrowRight size={20} /></>}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-muted-foreground)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
