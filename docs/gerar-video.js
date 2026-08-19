// DarkFactory — Fase 2
// Por enquanto: só captura os dados do formulário e guarda localmente.
// Nada de IA, TTS ou renderização ainda — isso vem nas próximas fases.

const statusMsg = document.getElementById("statusMsg");

document.getElementById("btnAutomatico").addEventListener("click", () => {
  statusMsg.textContent = "Geração automática de tema ainda não implementada (próxima fase).";
});

document.getElementById("btnGerar").addEventListener("click", () => {
  const dados = {
    nicho: document.getElementById("nicho").value.trim(),
    tema: document.getElementById("tema").value.trim(),
    duracao: document.getElementById("duracao").value,
    estilo: document.getElementById("estilo").value,
    criadoEm: new Date().toISOString()
  };

  if (!dados.nicho || !dados.tema) {
    statusMsg.textContent = "Preencha ao menos o nicho e o tema.";
    return;
  }

  localStorage.setItem("darkfactory_ultimo_pedido", JSON.stringify(dados));
  statusMsg.textContent = "Dados salvos no navegador. A geração real ainda será implementada.";
});
