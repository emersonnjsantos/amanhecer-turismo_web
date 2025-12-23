document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Lógica do Carrossel Foz do Iguaçu (Automático)
    const track = document.getElementById('carousel-track');

    if (track) {
        let index = 0;
        const totalItems = track.children.length;

        const getItemsToShow = () => {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        };

        const updateCarousel = () => {
            const itemsToShow = getItemsToShow();
            const firstItem = track.children[0];
            if (!firstItem) return;

            const width = firstItem.offsetWidth + 32; // width + gap

            // Verifica se o index ultrapassou o limite máximo de scroll
            const maxIndex = totalItems - itemsToShow;
            if (index > maxIndex) index = 0;

            track.style.transform = `translateX(-${index * width}px)`;
        };

        const nextSlide = () => {
            const itemsToShow = getItemsToShow();
            if (index < totalItems - itemsToShow) {
                index++;
            } else {
                index = 0;
            }
            updateCarousel();
        };

        // Inicia o intervalo de 3 segundos
        let slideInterval = setInterval(nextSlide, 3000);

        // Pausa ao passar o mouse para facilitar a leitura/clique
        track.parentElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
        track.parentElement.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 3000);
        });

        window.addEventListener('resize', () => {
            updateCarousel();
        });
    }

    // Animação de Contagem de Estatísticas
    const statsSection = document.getElementById('stats-section');
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 segundos
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentCount = Math.floor(progress * target);

                if (counter.innerText.includes('+')) {
                    if (counter.innerText.startsWith('+')) counter.innerText = `+${currentCount.toLocaleString()}`;
                    else counter.innerText = `${currentCount.toLocaleString()}+`;
                } else if (counter.innerText.includes('%')) {
                    counter.innerText = `${currentCount}%`;
                } else if (counter.innerText.includes('Anos')) {
                    counter.innerText = `${currentCount} Anos`;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    // Garante o valor final exato
                    if (counter.innerText.includes('+')) {
                        if (counter.innerText.startsWith('+')) counter.innerText = `+${target.toLocaleString()}`;
                        else counter.innerText = `${target.toLocaleString()}+`;
                    } else if (counter.innerText.includes('%')) {
                        counter.innerText = `${target}%`;
                    } else if (counter.innerText.includes('Anos')) {
                        counter.innerText = `${target} Anos`;
                    }
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    if (statsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Injeção Dinâmica do Modal de Consultoria
    const injectModal = () => {
        const modalHTML = `
        <div id="consultancy-modal" class="fixed inset-0 z-[100] hidden">
            <div class="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm" onclick="closeConsultancyModal()"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
                <div class="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
                    <button onclick="closeConsultancyModal()" class="absolute top-6 right-6 text-gray-400 hover:text-brand-orange transition">
                        <i class="fa-solid fa-xmark text-2xl"></i>
                    </button>

                    <div id="modal-step-1">
                        <div class="flex items-center gap-3 mb-8">
                            <i class="fa-solid fa-sun text-brand-orange text-3xl"></i>
                            <h2 class="text-2xl font-bold text-brand-blue">Agendar Consultoria</h2>
                        </div>

                        <form id="consultancy-form" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">Nome</label>
                                    <input type="text" name="nome" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">Sobrenome</label>
                                    <input type="text" name="sobrenome" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition">
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">WhatsApp</label>
                                    <input type="tel" name="whatsapp" required placeholder="(XX) XXXXX-XXXX" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition">
                                </div>
                                <div>
                                    <label class="block text-sm font-bold text-gray-700 mb-2">E-mail</label>
                                    <input type="email" name="email" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition">
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">Endereço</label>
                                <input type="text" name="endereco" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition">
                            </div>

                            <button type="button" onclick="goToStep2()" class="w-full bg-brand-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition shadow-lg">
                                Continuar
                            </button>
                        </form>
                    </div>

                    <div id="modal-step-2" class="hidden">
                        <h2 class="text-2xl font-bold text-brand-blue mb-6">Proteção de Dados (LGPD)</h2>
                        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 max-h-48 overflow-y-auto text-sm text-gray-600 leading-relaxed">
                            <h4 class="font-bold mb-2">Política de Privacidade Amanhecer Turismo</h4>
                            <p class="mb-4">Para fornecer uma consultoria personalizada, precisamos coletar seus dados básicos. Estes dados serão utilizados exclusivamente por nossos especialistas para entrar em contato via WhatsApp ou E-mail.</p>
                            <p class="mb-4">**Quais dados coletamos?** Nome, E-mail, Telefone e Endereço.</p>
                            <p class="mb-4">**Finalidade:** Agendamento de consultoria e envio de orçamentos personalizados.</p>
                            <p>Ao concordar, você autoriza a Amanhecer Turismo a processar suas informações conforme descrito.</p>
                        </div>

                        <div class="flex items-center gap-3 mb-8">
                            <input type="checkbox" id="terms-check" class="w-6 h-6 rounded border-gray-300 text-brand-orange focus:ring-brand-orange">
                            <label for="terms-check" class="text-sm text-gray-700 font-medium select-none cursor-pointer">
                                Eu aceito os termos e as políticas de proteção de dados.
                            </label>
                        </div>

                        <div class="flex gap-4">
                            <button onclick="goToStep1()" class="flex-1 border-2 border-gray-200 text-gray-500 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                                Negar / Voltar
                            </button>
                            <button id="btn-confirm-booking" onclick="submitBooking()" class="flex-[2] bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                Confirmar Agendamento
                            </button>
                        </div>
                    </div>

                    <div id="modal-success" class="hidden text-center py-8">
                        <div class="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fa-solid fa-check text-4xl"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-brand-blue mb-4">Solicitação Enviada!</h2>
                        <p class="text-gray-600 mb-8">Fique atento ao seu WhatsApp. Um de nossos consultores entrará em contato em breve.</p>
                        <button onclick="closeConsultancyModal()" class="bg-brand-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition">
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Re-vincula os eventos após a injeção
        const termsCheck = document.getElementById('terms-check');
        const btnConfirm = document.getElementById('btn-confirm-booking');
        if (termsCheck && btnConfirm) {
            termsCheck.addEventListener('change', () => {
                btnConfirm.disabled = !termsCheck.checked;
            });
        }
    };

    injectModal();
});

// Configuração do Supabase (Substitua pelos seus dados reais)
const SUPABASE_URL = 'https://jvgxcdhldngzpxbnqelt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_slfVosEqkcS0OPKN5zKcsQ_HjWUr83Xj16D3T';

let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'https://SUA_URL_AQUI.supabase.co') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Lógica do Modal de Consultoria
window.openConsultancyModal = () => {
    const modal = document.getElementById('consultancy-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        goToStep1();
    }
};

window.closeConsultancyModal = () => {
    const modal = document.getElementById('consultancy-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
};

window.goToStep1 = () => {
    const step1 = document.getElementById('modal-step-1');
    const step2 = document.getElementById('modal-step-2');
    const success = document.getElementById('modal-success');
    if (step1 && step2 && success) {
        step1.classList.remove('hidden');
        step2.classList.add('hidden');
        success.classList.add('hidden');
    }
};

window.goToStep2 = () => {
    const form = document.getElementById('consultancy-form');
    const step1 = document.getElementById('modal-step-1');
    const step2 = document.getElementById('modal-step-2');
    if (form && form.checkValidity()) {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
    } else if (form) {
        form.reportValidity();
    }
};

window.submitBooking = async () => {
    const form = document.getElementById('consultancy-form');
    const termsCheck = document.getElementById('terms-check');
    const btnConfirm = document.getElementById('btn-confirm-booking');

    if (!termsCheck || !termsCheck.checked) return;

    btnConfirm.disabled = true;
    btnConfirm.innerText = 'Processando...';

    const formData = new FormData(form);
    const data = {
        nome: formData.get('nome'),
        sobrenome: formData.get('sobrenome'),
        whatsapp: formData.get('whatsapp'),
        email: formData.get('email'),
        endereco: formData.get('endereco'),
        aceite_termos: true,
        created_at: new Date().toISOString()
    };

    try {
        if (!supabaseClient) {
            console.warn('Supabase não configurado. Simulando sucesso...');
            setTimeout(() => showSuccess(), 1000);
            return;
        }

        const { error } = await supabaseClient
            .from('leads')
            .insert([data]);

        if (error) throw error;
        showSuccess();
    } catch (error) {
        console.error('Erro ao salvar no Supabase:', error);
        alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
        btnConfirm.disabled = false;
        btnConfirm.innerText = 'Confirmar Agendamento';
    }
};

function showSuccess() {
    const step2 = document.getElementById('modal-step-2');
    const success = document.getElementById('modal-success');
    const form = document.getElementById('consultancy-form');
    const termsCheck = document.getElementById('terms-check');
    const btnConfirm = document.getElementById('btn-confirm-booking');

    if (step2 && success && form && termsCheck && btnConfirm) {
        step2.classList.add('hidden');
        success.classList.remove('hidden');
        form.reset();
        termsCheck.checked = false;
        btnConfirm.disabled = true;
        btnConfirm.innerText = 'Confirmar Agendamento';
    }
}
