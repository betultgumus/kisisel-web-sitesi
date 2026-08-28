import { AnimatePresence, motion } from "motion/react";
import { IconArrowRight, IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { contactSubmitAdapter } from "@/lib/contactAdapter";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyboard);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    const data = new FormData(event.currentTarget);
    await contactSubmitAdapter({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    setSubmitted(true);
  };
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <motion.div ref={modalRef} className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ opacity: 0, y: 25, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}>
            <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="İletişim formunu kapat"><IconX size={20} /></button>
            {submitted ? (
              <div className="form-success"><IconCheck size={28} /><span>Form arayüzü hazır</span><h2 id="contact-title">Mesajınız henüz gönderilmedi.</h2><p>Ücretsiz bir form sağlayıcısı bağlandığında gönderim aktif olacak. Şimdilik e-posta bağlantısını kullanabilirsiniz.</p><Button onClick={() => setSubmitted(false)}>Forma dön</Button></div>
            ) : (
              <>
                <span className="modal-kicker">İletişim formu</span>
                <h2 id="contact-title">Bir fikriniz mi var?</h2>
                <p>Mesajınızı bırakın. Bu form provider-independent bir gönderim adaptörüne bağlanmaya hazırdır.</p>
                <form onSubmit={submit}>
                  <label>Adınız<input name="name" required autoComplete="name" placeholder="Ad Soyad" /></label>
                  <label>E-posta<input type="email" name="email" required autoComplete="email" placeholder="siz@example.com" /></label>
                  <label>Mesajınız<textarea name="message" required minLength={10} rows={4} placeholder="Kısaca anlatın…" /></label>
                  <Button type="submit">Devam et <IconArrowRight size={18} /></Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
