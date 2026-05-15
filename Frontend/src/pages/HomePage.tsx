import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Timer, Users } from 'lucide-react';
import { btnPrimaryClass, btnSecondaryClass, cardClass } from '../lib/ui';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 py-6 sm:py-10">
      <section className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Digital wellbeing</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Understand how you spend screen time.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          Register people and applications, log sessions with day-level detail, and read a calm dashboard
          that aggregates usage without noise.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/users" className={btnPrimaryClass}>
            Manage users
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link to="/usage" className={btnSecondaryClass}>
            Log usage
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className={cardClass}>
          <Users className="h-8 w-8 text-accent" strokeWidth={1.75} aria-hidden />
          <h2 className="mt-4 text-base font-semibold text-ink">People first</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Keep a small directory of users so every record stays attributable.
          </p>
        </div>
        <div className={cardClass}>
          <Timer className="h-8 w-8 text-accent" strokeWidth={1.75} aria-hidden />
          <h2 className="mt-4 text-base font-semibold text-ink">Structured logs</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Capture days, hours, minutes, and part of the day in one consistent form.
          </p>
        </div>
        <div className={cardClass}>
          <BarChart3 className="h-8 w-8 text-accent" strokeWidth={1.75} aria-hidden />
          <h2 className="mt-4 text-base font-semibold text-ink">Quiet charts</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Compare applications and periods with charts tuned to the same palette as the app.
          </p>
        </div>
      </section>

      <div className="flex justify-center">
        <Link to="/dashboard" className={`${btnSecondaryClass} px-6`}>
          Open dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
