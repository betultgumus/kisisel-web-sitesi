export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactResult = { sent: boolean; reason?: string };
export type ContactSubmitAdapter = (payload: ContactPayload) => Promise<ContactResult>;

// Ücretsiz bir form servisi seçildiğinde yalnızca bu adapter değiştirilecek.
export const contactSubmitAdapter: ContactSubmitAdapter = async () => ({
  sent: false,
  reason: "Form sağlayıcısı henüz yapılandırılmadı.",
});
