import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Field, Input } from "../../components/Field";
import { useToast } from "../../components/Toast";
import { ApiError } from "../../lib/api";
import heroImage from "../../assets/equishare-hero.png";
import { useAuth } from "./AuthProvider";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") await signup(name, email, password);
      else await login(email, password);
      showToast({
        tone: "success",
        title: mode === "signup" ? "Account created" : "Welcome back",
        body: "Your workspace is ready."
      });
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Authentication failed";
      setError(message);
      showToast({ tone: "error", title: "Authentication failed", body: message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell grid min-h-screen place-items-center bg-cloud px-4 py-10 text-ink">
      <motion.div
        className="grid w-full max-w-6xl overflow-hidden rounded-lg border border-line bg-surface shadow-2xl lg:grid-cols-[1.08fr_0.92fr]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <section className="relative hidden min-h-[620px] overflow-hidden bg-ink lg:block">
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink/20 via-transparent to-ink/70" />
          <motion.div
            className="absolute left-8 top-8 inline-flex items-center gap-3 rounded-lg bg-surface/90 px-4 py-3 shadow-xl backdrop-blur"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            <span className="brand-mark grid size-10 place-items-center rounded-lg text-sm font-black text-cloud">EQ</span>
            <div>
              <p className="text-sm font-bold text-ink">Equishare</p>
              <p className="text-xs text-muted">Expense equity studio</p>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-8 right-8 rounded-lg border border-white/20 bg-surface/90 p-5 shadow-2xl backdrop-blur"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <p className="text-2xl font-bold tracking-tight text-ink">Balance every shared cost with clarity.</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Import expenses, explain every rupee, and settle group balances without spreadsheet friction.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <AuthStat label="Imports" value="Clean" />
              <AuthStat label="Balances" value="Live" />
              <AuthStat label="Settles" value="Fast" />
            </div>
          </motion.div>
        </section>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
          <div className="mb-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-elevated/70 px-3 py-1 text-xs font-semibold text-muted">
              Equishare workspace
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-ink">{mode === "signup" ? "Create account" : "Welcome back"}</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Audit shared expenses, explain balances, and settle faster.</p>
          </div>
          <div className="grid gap-4">
            {mode === "signup" && (
              <Field label="Name">
                <Input value={name} onChange={(event) => setName(event.target.value)} required />
              </Field>
            )}
            <Field label="Email">
              <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Field>
            {error && <p className="rounded-md border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>}
            <Button type="submit" disabled={submitting}>
              {submitting ? "Working..." : mode === "signup" ? "Sign up" : "Log in"}
            </Button>
            <p className="text-center text-sm text-muted">
              {mode === "signup" ? "Already have an account?" : "Need an account?"}{" "}
              <Link className="font-semibold text-mint" to={mode === "signup" ? "/login" : "/signup"}>
                {mode === "signup" ? "Log in" : "Sign up"}
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AuthStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-elevated/70 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-ink">{value}</p>
    </div>
  );
}
