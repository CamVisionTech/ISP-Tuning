/**
 * CAMVISION TECH — FRONTEND APPLICATION LOGIC
 * Features:
 * - Interactive Before/After image comparison slider (mouse & touch)
 * - Scenario switcher (Lab/Color vs Low-Light/3DNR)
 * - Interactive IQ Triage Symptom Diagnostics Calculator
 * - Lead Capture & Form pre-fill integration
 * - Mobile Navigation Menu Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initComparisonSlider();
  initScenarioSwitcher();
  initTriageCalculator();
  initFormAndPricingIntegration();
  initMobileNav();
  initScrollSpy();
});

/* ==========================================================================
   1. COMPARISON SLIDER (POINTER & TOUCH WITH PAGE DRAG PREVENTION)
   ========================================================================== */
function initComparisonSlider() {
  const sliderWrapper = document.getElementById('comparison-slider');
  const rawLayer = document.getElementById('raw-layer');
  const sliderHandle = document.getElementById('slider-handle');

  if (!sliderWrapper || !rawLayer || !sliderHandle) return;

  let isDragging = false;
  let currentPercent = 50;

  function setSliderPosition(clientX) {
    const rect = sliderWrapper.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    
    // Clamp within 0% to 100%
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    currentPercent = (offsetX / rect.width) * 100;
    const pctString = currentPercent.toFixed(2);

    rawLayer.style.clipPath = `polygon(0 0, ${pctString}% 0, ${pctString}% 100%, 0 100%)`;
    rawLayer.style.webkitClipPath = `polygon(0 0, ${pctString}% 0, ${pctString}% 100%, 0 100%)`;
    sliderHandle.style.left = `${pctString}%`;
  }

  // Modern Unified Pointer Events (Mouse, Touch, Stylus)
  sliderWrapper.addEventListener('pointerdown', (e) => {
    isDragging = true;
    try {
      sliderWrapper.setPointerCapture(e.pointerId);
    } catch (_) {}
    setSliderPosition(e.clientX);
    e.preventDefault();
  });

  sliderWrapper.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
    e.preventDefault();
  });

  function endPointerDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    try {
      sliderWrapper.releasePointerCapture(e.pointerId);
    } catch (_) {}
  }

  sliderWrapper.addEventListener('pointerup', endPointerDrag);
  sliderWrapper.addEventListener('pointercancel', endPointerDrag);

  // Dedicated Mobile Touch Handlers (Prevent mobile page scroll/gesture)
  sliderWrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.cancelable) e.preventDefault();
    if (e.touches.length > 0) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: false });

  sliderWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    // CRITICAL: Prevent the browser from dragging/scrolling the page while sliding
    if (e.cancelable) e.preventDefault();
    if (e.touches.length > 0) {
      setSliderPosition(e.touches[0].clientX);
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchcancel', () => {
    isDragging = false;
  });

  // Keyboard Accessibility
  sliderWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentPercent = Math.max(0, currentPercent - 5);
      const pctString = currentPercent.toFixed(2);
      rawLayer.style.clipPath = `polygon(0 0, ${pctString}% 0, ${pctString}% 100%, 0 100%)`;
      rawLayer.style.webkitClipPath = `polygon(0 0, ${pctString}% 0, ${pctString}% 100%, 0 100%)`;
      sliderHandle.style.left = `${pctString}%`;
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      currentPercent = Math.min(100, currentPercent + 5);
      const pctString = currentPercent.toFixed(2);
      rawLayer.style.clipPath = `polygon(0 0, ${pctString}% 0, ${pctString}% 100%, 0 100%)`;
      rawLayer.style.webkitClipPath = `polygon(0 0, ${pctString}% 0, ${pctString}% 100%, 0 100%)`;
      sliderHandle.style.left = `${pctString}%`;
      e.preventDefault();
    }
  });
}

/* ==========================================================================
   2. SCENARIO SWITCHER (INDOOR LAB VS NIGHT SURVEILLANCE)
   ========================================================================== */
function initScenarioSwitcher() {
  const tabLab = document.getElementById('tab-scenario-lab');
  const tabNight = document.getElementById('tab-scenario-night');
  const tunedImg = document.getElementById('tuned-img');
  const rawImg = document.getElementById('raw-img');
  const deltaBeforeList = document.getElementById('delta-before-list');
  const deltaAfterList = document.getElementById('delta-after-list');

  if (!tabLab || !tabNight || !tunedImg || !rawImg) return;

  const scenarios = {
    lab: {
      rawSrc: 'assets/lab_raw.jpg',
      tunedSrc: 'assets/lab_tuned.jpg',
      before: [
        '❌ Uncalibrated Gray-World AWB causes severe green/yellow tint under commercial phosphor LEDs.',
        '❌ Blown-out window highlights due to missing local tone mapping (LTM) & gamma curve clipping.',
        '❌ Washed-out Macbeth chart color patches with Delta E > 9.4 error.',
        '❌ Murky dark shadow contrast with noisy sensor black-level offset.'
      ],
      after: [
        '✅ Custom multi-illuminant AWB boundary polygon with calibrated D65/TL84/A locus.',
        '✅ Wide Dynamic Range (WDR) tone mapping recovering crisp outdoor window highlights.',
        '✅ Custom 3x3 Color Correction Matrix (CCM) calibrated to Delta E < 1.6 against Macbeth chart.',
        '✅ Precise Black Level Correction (BLC) and 2DNR/3DNR texture preservation.'
      ]
    },
    night: {
      rawSrc: 'assets/night_raw.jpg',
      tunedSrc: 'assets/night_tuned.jpg',
      before: [
        '❌ Heavy chroma grain and salt-and-pepper noise across dark brickwork and alley shadows.',
        '❌ Moving pedestrian turned into a washed-out, smeared ghost due to uncalibrated temporal filtering.',
        '❌ Blinding bloom and clipping around the street lamp without dynamic range roll-off.',
        '❌ Massive video bitrate spikes over H.264/H.265 stream due to background noise entropy.'
      ],
      after: [
        '✅ Motion-adaptive 3DNR separates static backgrounds from moving subjects cleanly.',
        '✅ Moving pedestrian remains sharp with minimal ghosting artifacts and clear edges.',
        '✅ Local Tone Mapping balances street lamp brightness without blowing out surrounding details.',
        '✅ Video bitrate reduced by 24% by filtering high-frequency noise from static surfaces.'
      ]
    }
  };

  function switchScenario(key) {
    const data = scenarios[key];
    if (!data) return;

    // Swap images
    rawImg.src = data.rawSrc;
    tunedImg.src = data.tunedSrc;

    // Update details list
    deltaBeforeList.innerHTML = data.before.map(item => `<li>${item}</li>`).join('');
    deltaAfterList.innerHTML = data.after.map(item => `<li>${item}</li>`).join('');

    // Toggle active tab styles
    if (key === 'lab') {
      tabLab.classList.add('active');
      tabLab.setAttribute('aria-selected', 'true');
      tabNight.classList.remove('active');
      tabNight.setAttribute('aria-selected', 'false');
    } else {
      tabNight.classList.add('active');
      tabNight.setAttribute('aria-selected', 'true');
      tabLab.classList.remove('active');
      tabLab.setAttribute('aria-selected', 'false');
    }
  }

  tabLab.addEventListener('click', () => switchScenario('lab'));
  tabNight.addEventListener('click', () => switchScenario('night'));
}

/* ==========================================================================
   3. INTERACTIVE QUICK IQ TRIAGE DIAGNOSTIC CALCULATOR
   ========================================================================== */
function initTriageCalculator() {
  const socSelect = document.getElementById('triage-soc');
  const sensorSelect = document.getElementById('triage-sensor');
  const defectSelect = document.getElementById('triage-defect');
  const btnRecalc = document.getElementById('btn-recalculate-triage');

  const resultCode = document.getElementById('result-code');
  const resultTitle = document.getElementById('result-title');
  const resultCause = document.getElementById('result-cause');
  const resultAction = document.getElementById('result-action');
  const resultService = document.getElementById('result-service');
  const resultTime = document.getElementById('result-time');
  const resultCta = document.getElementById('result-cta-btn');

  if (!socSelect || !sensorSelect || !defectSelect || !btnRecalc) return;

  const diagnoses = {
    awb_cast: {
      code: 'ERR_AWB_LED_LOCUS_CLIP',
      title: 'AWB Illuminant Polygon Failure',
      cause: 'Default driver tables rely on generic blackbody locus assumptions. Commercial LEDs have sharp 450nm phosphor spikes that fall outside standard curves, tricking the AWB algorithm into over-amplifying green gain.',
      action: 'Calibrate sensor-specific chromaticity bounding polygons across D65, TL84, CWF, and 4000K LED in our light booth. Build smooth multi-illuminant weighting tables in your platform register schema.',
      service: '$250 Quick IQ Triage or 2-Wk Sprint',
      time: '24 Hours (Triage) / 10 Days (Sprint)'
    },
    night_ghosting: {
      code: 'ERR_3DNR_TEMPORAL_GHOST',
      title: 'Temporal Filter Motion-Weighting Mismatch',
      cause: 'Default 3DNR temporal tables apply heavy frame averaging across the entire scene without spatial motion detection thresholds, causing moving objects to smear and ghost while static noise remains unaddressed.',
      action: 'Decouple 2D spatial filtering from 3D temporal filtering. Tune motion detection sensitivity curves and noise profile gain tables to freeze motion sharply while smoothing stationary backgrounds.',
      service: '2-Week Tuning Sprint',
      time: '2 Weeks'
    },
    hdr_clipping: {
      code: 'ERR_HDR_STAGGER_LTM_CLIP',
      title: 'Exposure Synthesis & Local Tone Mapping Offset',
      cause: 'Staggered HDR or dual conversion gain (DCG) blending curves are not matched to the lens transmission curve, resulting in blown-out highlights and haloing around high-contrast edges.',
      action: 'Recalibrate exposure ratio tables (Short/Long ratio), tune gamma knee points, and calibrate Local Tone Mapping (LTM) bilateral grid filters to preserve natural highlight rolloff.',
      service: '2-Week Tuning Sprint',
      time: '2 Weeks'
    },
    ae_hunting: {
      code: 'ERR_AE_FLICKER_50_60HZ',
      title: 'Anti-Banding & Convergence Oscillation',
      cause: 'Auto-exposure step size and tolerance bands are improperly tuned for indoor AC lighting, causing 100Hz/120Hz light flicker and continuous gain hunting under minor luminance shifts.',
      action: 'Implement dual 50Hz/60Hz anti-flicker tables, calibrate integration time step boundaries, and configure smooth hysteresis dead-zones to achieve stable AE convergence in <280ms.',
      service: '$250 Quick IQ Triage',
      time: '24 Hours'
    },
    yolo_drop: {
      code: 'ERR_CV_EDGE_GRADIENT_LOSS',
      title: 'AI Feature Degradation (Over-Sharpening & NR Loss)',
      cause: 'Standard consumer ISP tuning uses aggressive spatial noise reduction and bilateral sharpening that washes out subtle texture gradients, causing neural network (YOLO/SSD) feature extractors to fail.',
      action: 'Tune ISP parameters specifically for machine vision: preserve high-frequency texture gradients, normalize luminance distributions across illuminants, and optimize distortion grids for SLAM.',
      service: '2-Week Tuning Sprint (Computer Vision Special)',
      time: '2 Weeks'
    }
  };

  function updateDiagnosis() {
    const defectKey = defectSelect.value;
    const socName = socSelect.options[socSelect.selectedIndex].text;
    const sensorName = sensorSelect.options[sensorSelect.selectedIndex].text;
    const item = diagnoses[defectKey] || diagnoses['awb_cast'];

    resultCode.textContent = item.code;
    resultTitle.textContent = `${item.title} (${socName.split(' ')[0]})`;
    resultCause.textContent = `${item.cause} Observed frequently when pairing ${sensorName} with ${socName}.`;
    resultAction.textContent = item.action;
    resultService.textContent = item.service;
    resultTime.textContent = item.time;

    // Pulse animation on the panel
    const panel = document.getElementById('triage-result-panel');
    if (panel) {
      panel.style.transition = 'box-shadow 0.3s ease';
      panel.style.boxShadow = '0 0 35px rgba(0, 229, 255, 0.4)';
      setTimeout(() => {
        panel.style.boxShadow = 'inset 0 0 20px rgba(0, 229, 255, 0.05)';
      }, 500);
    }
  }

  btnRecalc.addEventListener('click', (e) => {
    e.preventDefault();
    updateDiagnosis();
  });

  defectSelect.addEventListener('change', updateDiagnosis);
  socSelect.addEventListener('change', updateDiagnosis);
  sensorSelect.addEventListener('change', updateDiagnosis);

  // Link CTA to pre-fill the contact form
  if (resultCta) {
    resultCta.addEventListener('click', () => {
      const socName = socSelect.options[socSelect.selectedIndex].text;
      const sensorName = sensorSelect.options[sensorSelect.selectedIndex].text;
      const defectName = defectSelect.options[defectSelect.selectedIndex].text;
      
      const formPlatform = document.getElementById('form-platform');
      const formMsg = document.getElementById('form-message');
      const formPackage = document.getElementById('form-package');

      if (formPlatform) formPlatform.value = `${socName} + ${sensorName}`;
      if (formPackage) formPackage.value = defectSelect.value === 'awb_cast' || defectSelect.value === 'ae_hunting' ? 'triage' : 'sprint';
      if (formMsg) {
        formMsg.value = `Hi CamVision Tech team,\n\nWe are using ${socName} with ${sensorName}.\nOur main issue: ${defectName}.\nWe'd like to proceed with the technical diagnosis and frame audit.`;
      }
    });
  }
}

/* ==========================================================================
   4. FORM & PRICING CARD INTEGRATION
   ========================================================================== */
function initFormAndPricingIntegration() {
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const btnReset = document.getElementById('btn-reset-form');

  // Pricing buttons pre-select package in contact form
  const pricingButtons = document.querySelectorAll('[data-package]');
  pricingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pkg = btn.getAttribute('data-package');
      const select = document.getElementById('form-package');
      if (select && pkg) {
        select.value = pkg;
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value || 'Hardware Engineer';
      const email = document.getElementById('form-email')?.value || '';
      const platform = document.getElementById('form-platform')?.value || 'Not specified';
      const pkgSelect = document.getElementById('form-package');
      const pkg = pkgSelect ? pkgSelect.options[pkgSelect.selectedIndex].text : 'General Inquiry';
      const message = document.getElementById('form-message')?.value || '';

      const subject = encodeURIComponent(`[CamVision Tech Inquiry] ${pkg} - ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Work Email: ${email}\n` +
        `Platform & Sensor: ${platform}\n` +
        `Service Package: ${pkg}\n\n` +
        `Project Details & Current Issue:\n${message}\n\n` +
        `Sent via CamVision Tech website.`
      );

      // Launch mailto
      const mailtoUrl = `mailto:contact.camvisiontech@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      // Show success container
      form.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'flex';
    });
  }

  if (btnReset && form && formSuccess) {
    btnReset.addEventListener('click', () => {
      form.reset();
      form.style.display = 'flex';
      formSuccess.style.display = 'none';
    });
  }
}

/* ==========================================================================
   5. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');
  const links = document.querySelectorAll('.nav-link');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

/* ==========================================================================
   6. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHTING)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
