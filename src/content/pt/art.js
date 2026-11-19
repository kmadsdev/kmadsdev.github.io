// Texto das ilustrações (descrições para leitores de tela, nomes nos desenhos)
// e do capítulo provisório do kit. `showcase` sai quando a introdução entrar.

export const art = {
    archRuns: {
        label: 'Diagrama do caminho de uma requisição: navegador, edge, gateway, depois um de dois hosts, depois o banco de dados. O gateway envia cada requisição para o próximo host da fila.',
        nodes: { browser: 'Navegador', edge: 'Edge', gateway: 'Gateway', hostA: 'Host A', hostB: 'Host B', db: 'Banco de dados' },
    },
    fuelMap: {
        label: 'Desenho do mapa de combustível de uma central de injeção: uma superfície sobre uma grade de rotação e carga do motor. Um ponto vermelho mostra a célula em uso durante uma aceleração.',
        rpm: 'RPM',
        load: 'Carga',
    },
};

export const showcase = {
    label: 'Kit',
    title: 'As peças da placa',
    lead: 'Um capítulo provisório. Ele mostra a grade, os tipos de módulo e dois desenhos, para que cada seção nova comece das mesmas peças.',
    arch: {
        name: 'Caminho da requisição',
        title: 'Uma requisição passa pelo edge e pelo gateway',
        text: 'O gateway envia cada requisição para o próximo host da fila. A linha em uso fica vermelha e o pacote é a requisição.',
    },
    fuel: {
        name: 'Mapa de combustível',
        title: 'A central de injeção lê uma célula por vez',
        text: 'Rotação e carga escolhem a célula. Estudo esses mapas em Honda Civics antigos.',
    },
    stat: { unit: 'anos', source: 'de experiência em engenharia.' },
    list: { name: 'Linguagens que escrevo', title: 'Backend primeiro' },
    link: { title: 'Aplicações em produção', text: 'A prova está mais abaixo na página.' },
};
