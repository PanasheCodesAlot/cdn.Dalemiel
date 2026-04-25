/**
 * DALEMIEL AD CDN v1.1 - Unified Description & Truncation
 * Self-contained interactive ad delivery script with loading state.
 */
(function() {
    // 1. Configuration & Data
    let adData = {
        title: "The Sovereign Standard",
        // Unified description
        description: "True success is not a gift; it is a calculation. Our methodology strips away the noise of the mediocre and focuses on the high-frequency actions that actually move the needle.",
        cta: "Visit",
        url: "#",
        logo: '#',
        accentColor: "#cc0000"
    };

    // 2. Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        
        .dm-cdn-wrapper {
            all: initial;
            font-family: 'Inter', sans-serif;
            display: block;
            width: 100%;
            max-width: 500px;
            margin: 20px auto;
        }

        .dm-ad-container {
            background: #ffffff;
            border: 1px solid rgba(18, 18, 18, 0.08);
            border-radius: 2.5rem;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
            overflow: hidden;
            position: relative;
            min-height: 100px;
        }

        /* --- Truncation Logic --- */
        .dm-truncate {
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            overflow: hidden;
        }

        /* --- Skeleton Loading States --- */
        .dm-skeleton .dm-s-box {
            background: #f0f0f0;
            background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: dm-pulse 1.5s infinite;
            border-radius: 4px;
        }

        @keyframes dm-pulse {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }

        .dm-s-logo { width: 80px; height: 80px; border-radius: 1.2rem; }
        .dm-s-title { width: 140px; height: 20px; margin-bottom: 12px; }
        .dm-s-text { width: 100%; height: 12px; margin-bottom: 8px; }

        /* --- Active Styles --- */
        .dm-ad-container:not(.dm-skeleton):hover {
            border-color: ${adData.accentColor};
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
        }

        .dm-flex { display: flex; gap: 1.25rem; align-items: flex-start; }
        
        .dm-logo {
            width: 70px; height: 70px;
            border-radius: 1.2rem;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; transition: transform 0.5s ease;
            overflow: hidden;
        }

        .dm-ad-container:hover .dm-logo { transform: scale(1.05) rotate(-2deg); }
        .dm-title-row { display: flex; justify-content: space-between; align-items: flex-start; width: 100%; gap: 10px; }
        
        .dm-title { 
            font-weight: 900; 
            font-size: 1.25rem; 
            color: #121212; 
            margin: 0; 
            flex: 1;
            min-width: 0; /* Required for ellipsis in flex */
        }

        .dm-badge { font-size: 9px; font-weight: 900; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; color: #6b7280; text-transform: uppercase; flex-shrink: 0; }
        .dm-description { font-size: 0.875rem; color: #666; line-height: 1.5; margin-top: 0.5rem; }

        .dm-expandable {
            display: grid; grid-template-rows: 0fr;
            transition: grid-template-rows 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease;
            opacity: 0;
        }

        .dm-ad-container.is-expanded .dm-expandable { grid-template-rows: 1fr; opacity: 1; margin-top: 1rem; }
        .dm-inner { overflow: hidden; display: flex; flex-direction: column; gap: 1rem; }

        .dm-footer {
            opacity: 0; height: 0; overflow: hidden;
            transition: all 0.5s ease;
            display: flex; justify-content: space-between; align-items: center;
        }

        .dm-ad-container.is-expanded .dm-footer {
            opacity: 1; height: auto; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid #f0f0f0;
        }

        .dm-visit { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: ${adData.accentColor}; text-decoration: none; display: flex; align-items: center; gap: 0.5rem; }
        .dm-chevron { color: #d1d5db; transition: transform 0.4s ease; font-size: 1.2rem; }
        .dm-ad-container.is-expanded .dm-chevron { transform: rotate(180deg); }
        .dm-hint { position: absolute; bottom: 1rem; right: 1.5rem; transition: opacity 0.3s; }
        .dm-ad-container.is-expanded .dm-hint { opacity: 0; }
    `;
    document.head.appendChild(style);

    // 3. Load Phosphor Icons
    if (!document.getElementById('ph-icons-script')) {
        const script = document.createElement('script');
        script.id = 'ph-icons-script';
        script.src = 'https://unpkg.com/@phosphor-icons/web';
        document.head.appendChild(script);
    }

    // 4. Create Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'dm-cdn-wrapper';
    
    wrapper.innerHTML = `
        <div id="dm-ad" class="dm-ad-container dm-skeleton">
            <div class="dm-flex">
                <div class="dm-s-box dm-s-logo"></div>
                <div style="flex: 1;">
                    <div class="dm-s-box dm-s-title"></div>
                    <div class="dm-s-box dm-s-text"></div>
                </div>
            </div>
        </div>
    `;

    // 5. Simulation Logic
    const initAd = async () => {
        try {
            const url = 'https://daemon-dalemiel.vercel.app/ad'
            const req = await fetch(url);
            const json = await req.json();

            let {data, error} = json
            if (error) throw error

            console.log(data)

            if (data?.length == 0) throw 'Opps. No data from Dalemiel'

            adData.title = data.title
            adData.description = data.desc
            adData.logo = data.customers.logo_url
            adData.url = `https://daemon-dalemiel.vercel.app/click?ad_id=${data.id}&cust_id=${data.by_cust}&url=${data.url}`


        } catch (e) {
            adData.title = 'Failed to get Ad Data'
            adData.description = 'This might most likely be because of your network or an error in our severs'
            adData.logo = 'http://img.freepik.com/premium-vector/warning-danger-sign-isolated-white_118339-782.jpg?w=740'
            adData.url = 'https://wa.me/+265892591271?text=Hi%20Dalemiel,'
        }

        setTimeout(() => {
            const container = wrapper.querySelector('#dm-ad');
            container.classList.remove('dm-skeleton');
            
            container.innerHTML = `
                <div class="dm-flex">
                    <div class="dm-logo">
                        <img style='width: 100%; height: auto; max-height: 80px' src=${adData.logo} />
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <div class="dm-title-row">
                            <h3 class="dm-title dm-truncate">${adData.title}</h3>
                            <span class="dm-badge">Ad</span>
                        </div>
                        <p class="dm-description dm-truncate">${adData.description}</p>
                    </div>
                </div>

                <div class="dm-expandable">
                    <div class="dm-inner">
                        <p class="dm-description" style="font-weight: 600;">Ads by Dalemiel. <span > <a style="color: ${'#cc0000'}; text-decoration: underline" target="_blank" href='https://wa.me/+265892591271?text=Hi%20Dalemiel,'>Let more people know about you today</a> </span> </p>
                    </div>
                </div>

                <div class="dm-footer">
                    <a href="${adData.url}" class="dm-visit" target="_blank">
                        ${adData.cta}
                        <i class="ph-bold ph-arrow-up-right"></i>
                    </a>
                    <i class="ph ph-caret-down dm-chevron"></i>
                </div>

                <div class="dm-hint">
                    <i class="ph ph-caret-down dm-chevron"></i>
                </div>
            `;

            container.onclick = function() {
                this.classList.toggle('is-expanded');
                // Toggle truncation on the main description when expanded
                const mainDesc = this.querySelector('.dm-flex .dm-description');
                mainDesc.classList.toggle('dm-truncate');

                if (window.navigator.vibrate) window.navigator.vibrate(10);
            };

            const stopLink = container.querySelector('.dm-visit');
            stopLink.onclick = (e) => e.stopPropagation();
            
        }, 100);
    };

    // 6. Injection
    const currentScript = document.currentScript;
    if (currentScript) {
        currentScript.parentNode.insertBefore(wrapper, currentScript.nextSibling);
    } else {
        document.body.appendChild(wrapper);
    }

    initAd();
})();