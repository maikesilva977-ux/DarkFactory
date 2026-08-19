const statusMsg = document.getElementById("statusMsg");
const WORKER_URL = "https://darkfactory-backend.maikesilva977.workers.dev";

document.getElementById("btnAutomatico").addEventListener("click", () => {
  statusMsg.textContent = "Geração automática de tema ainda não implementada (próxima fase).";
});

document.getElementById("btnGerar").addEventListener("click", async () => {
  const nicho = document.getElementById("nicho").value.trim();
  const tema = document.getElementById("tema").value.trim();
  const duracao = document.getElementById("duracao").value;
  const estilo = document.getElementById("estilo").value;

  if (!nicho || !tema) {
    statusMsg.textContent = "Preencha ao menos o nicho e o tema.";
    return;
  }

  statusMsg.textContent = "Enviando pedido...";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nicho, tema, duracao, estilo })
    });

    const data = await response.json();

    if (data.ok) {
      statusMsg.textContent = "Roteiro sendo gerado! Confira em alguns segundos na pasta roteiros/ do repositório.";
    } else {
      statusMsg.textContent = "Erro ao gerar: " + (data.error || "desconhecido");
    }
  } catch (err) {
    statusMsg.textContent = "Erro de conexão: " + err.message;
  }
});
