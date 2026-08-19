export default {
  async fetch(request, env) {
    const allowedOrigin = "https://maikesilva977-ux.github.io";
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(allowedOrigin) });
    }

    if (request.method !== "POST") {
      return new Response("Método não permitido", { status: 405 });
    }

    if (origin !== allowedOrigin) {
      return new Response("Origem não permitida", {
        status: 403,
        headers: corsHeaders(allowedOrigin)
      });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response("JSON inválido", {
        status: 400,
        headers: corsHeaders(allowedOrigin)
      });
    }

    const { nicho, tema, duracao, estilo } = body;

    if (!nicho || !tema) {
      return new Response("Nicho e tema são obrigatórios", {
        status: 400,
        headers: corsHeaders(allowedOrigin)
      });
    }

    const githubResponse = await fetch(
      "https://api.github.com/repos/maikesilva977-ux/DarkFactory/actions/workflows/gerar-roteiro.yml/dispatches",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "DarkFactory-Worker"
        },
        body: JSON.stringify({
          ref: "main",
          inputs: {
            nicho: nicho,
            tema: tema,
            duracao: String(duracao || "45"),
            estilo: estilo || "misterio"
          }
        })
      }
    );

    if (githubResponse.status === 204) {
      return new Response(JSON.stringify({ ok: true, message: "Workflow disparado com sucesso" }), {
        status: 200,
        headers: { ...corsHeaders(allowedOrigin), "Content-Type": "application/json" }
      });
    } else {
      const errorText = await githubResponse.text();
      return new Response(JSON.stringify({ ok: false, error: errorText }), {
        status: 502,
        headers: { ...corsHeaders(allowedOrigin), "Content-Type": "application/json" }
      });
    }
  }
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
