const { createElement: h, useEffect, useRef, useState } = React;

const cx = (...classes) => classes.filter(Boolean).join(" ");

const ui = {
    section: "relative w-full px-5 sm:px-7",
    sectionHeading: "mx-auto mb-12 w-full max-w-[650px] text-center md:mb-[70px]",
    sectionTitle: "mb-5 text-[25px] font-bold leading-tight tracking-normal text-[#080914]",
    sectionCopy: "mb-0 text-base text-[#717386] md:text-[17px]",
    primaryButton:
        "icon-md inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-xl border border-[#030313] bg-[#030313] px-[26px] text-base font-bold text-white shadow-[0_12px_20px_rgba(3,3,19,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(3,3,19,0.22)] max-md:w-full",
    secondaryButton:
        "icon-md inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-xl border border-[#d9dbe2] bg-white px-[26px] text-base font-bold text-[#080914] transition duration-200 hover:-translate-y-0.5 hover:border-[#c6cad5] hover:shadow-[0_9px_18px_rgba(12,13,24,0.09)] max-md:w-full",
    iconButton:
        "grid h-[50px] w-[50px] place-items-center rounded-[14px] border border-[#d9dbe2] bg-white text-[#242532] transition duration-200 hover:-translate-y-0.5 hover:border-[#aeb3c0] hover:bg-[#f0f1f5] hover:shadow-[0_9px_14px_rgba(12,13,24,0.1)] max-[460px]:h-[46px] max-[460px]:w-[46px]",
    activeIconButton: "border-[#aeb3c0] bg-[#f0f1f5] shadow-[0_9px_14px_rgba(12,13,24,0.1)]",
    projectCard:
        "project-reveal lift-card overflow-hidden rounded-[14px] border border-[#d9dbe2] bg-white shadow-[0_9px_18px_rgba(12,13,24,0.09)]",
    skillCard:
        "skill-lift icon-lg grid min-h-[138px] place-items-center content-center gap-[19px] rounded-[14px] border border-[#d9dbe2] bg-[#f9fafc]/90 shadow-[0_7px_13px_rgba(12,13,24,0.08)]"
};

const projects = [
    {
        title: "Pillaflow",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
        alt: "Notebook with planning notes and productivity tools",
        description:
            "Daily productivity app that brings micro habits, planning, health tracking, home routines, and finances into one focused workflow.",
        tags: ["Productivity", "JavaScript", "React", "PostgreSQL"],
        demoUrl: "https://pillaflow.com",
        demoLabel: "Website"
    },
    {
        title: "Ruzo Tech",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80",
        alt: "Website design wireframes and development workspace",
        description:
            "Conversion-focused web studio site with responsive pages, service flows, dark mode, contact routes, and production-ready launch content.",
        tags: ["HTML", "CSS", "JavaScript", "Responsive UI"],
        codeUrl: "https://github.com/lucasrbrusu/Ruzo-Tech",
        demoUrl: "https://ruzotech.com",
        demoLabel: "Website"
    },
    {
        title: "LLM Benchmark Tool",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
        alt: "Code and benchmark data displayed on a laptop",
        description:
            "Python-based benchmark utility for evaluating large language model performance and comparing results across repeatable test runs.",
        tags: ["Python", "LLM Testing", "Benchmarking", "Automation"],
        codeUrl: "https://github.com/lucasrbrusu/LLM-Benchmark"
    }
];

const skills = [
    { name: "JavaScript", icon: "braces" },
    { name: "React", icon: "code" },
    { name: "TypeScript", icon: "terminal" },
    { name: "Node.js", icon: "server" },
    { name: "Python", icon: "bug" },
    { name: "SQL Database", icon: "database" },
    { name: "APIs", icon: "globe" },
    { name: "DevOps", icon: "microchip" },
    { name: "Architecture", icon: "layers" },
    { name: "Git", icon: "git" }
];

const socialLinks = [
    { label: "GitHub", href: "https://github.com/lucasrbrusu", icon: "github", active: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/lucasrbrusu/", icon: "linkedin", active: true },
    { label: "Email", href: "mailto:elucas2005@icloud.com", icon: "mail", active: true }
];

const iconPaths = {
    braces: [
        "M8 3H7a3 3 0 0 0-3 3v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a3 3 0 0 0 3 3h1",
        "M16 3h1a3 3 0 0 1 3 3v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a3 3 0 0 1-3 3h-1"
    ],
    bug: [
        "M8 8h8",
        "M9 3l1.5 3h3L15 3",
        "M7 13H4",
        "M20 13h-3",
        "M7 17l-2 2",
        "M17 17l2 2",
        "M8 8a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0Z",
        "M10 12h.01",
        "M14 12h.01"
    ],
    code: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
    database: [
        "M4 6c0-2 3.6-3.5 8-3.5S20 4 20 6s-3.6 3.5-8 3.5S4 8 4 6Z",
        "M4 6v6c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V6",
        "M4 12v6c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5v-6"
    ],
    external: ["M15 3h6v6", "M10 14 21 3", "M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"],
    git: ["M6 3v12", "M18 9a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z", "M6 21a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z", "M18 9v2a5 5 0 0 1-5 5H9"],
    globe: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M2 12h20", "M12 2a15 15 0 0 1 0 20", "M12 2a15 15 0 0 0 0 20"],
    layers: ["M12 2 2 7l10 5 10-5-10-5Z", "M2 12l10 5 10-5", "M2 17l10 5 10-5"],
    mail: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z", "m22 6-10 7L2 6"],
    microchip: [
        "M9 9h6v6H9Z",
        "M7 2v3",
        "M12 2v3",
        "M17 2v3",
        "M7 19v3",
        "M12 19v3",
        "M17 19v3",
        "M2 7h3",
        "M2 12h3",
        "M2 17h3",
        "M19 7h3",
        "M19 12h3",
        "M19 17h3",
        "M5 5h14v14H5Z"
    ],
    server: ["M4 3h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z", "M4 13h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z", "M6 7h.01", "M6 17h.01"],
    sparkles: ["M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z", "M5 3v4", "M3 5h4", "M19 17v4", "M17 19h4"],
    terminal: ["M4 17h16", "M4 7l5 5-5 5", "M12 17h4"],
    zap: ["M13 2 3 14h8l-1 8 11-13h-8l1-7Z"]
};

function Icon({ name, fill = false }) {
    if (name === "github") {
        return h(
            "svg",
            { className: "icon", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false" },
            h("path", {
                d: "M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-2.13c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A11.1 11.1 0 0 1 12 6.1c.98 0 1.95.13 2.87.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.13v3.14c0 .31.21.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
            })
        );
    }

    if (name === "linkedin") {
        return h(
            "svg",
            { className: "icon", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", focusable: "false" },
            h("path", {
                d: "M5.37 21.5H1.8V8.98h3.57V21.5ZM3.58 7.24A2.07 2.07 0 1 1 3.58 3.1a2.07 2.07 0 0 1 0 4.14ZM22.2 21.5h-3.56v-6.09c0-1.45-.03-3.32-2.03-3.32-2.03 0-2.34 1.58-2.34 3.22v6.19h-3.56V8.98h3.42v1.71h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.65 2.37 4.65 5.46v7.21Z"
            })
        );
    }

    return h(
        "svg",
        {
            className: "icon",
            viewBox: "0 0 24 24",
            fill: fill ? "currentColor" : "none",
            stroke: "currentColor",
            strokeWidth: "2.25",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            focusable: "false"
        },
        iconPaths[name].map((path) => h("path", { d: path, key: path }))
    );
}

function useRevealOnScroll(threshold = 0.16) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return undefined;
        }

        if (!("IntersectionObserver" in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
}

function useStaggeredReveal(itemCount, threshold = 0.22, delay = 120) {
    const ref = useRef(null);
    const [visibleItems, setVisibleItems] = useState(() => Array(itemCount).fill(false));

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return undefined;
        }

        const showAll = () => setVisibleItems(Array(itemCount).fill(true));

        if (!("IntersectionObserver" in window)) {
            showAll();
            return undefined;
        }

        const timeouts = [];
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                observer.unobserve(entry.target);

                for (let index = 0; index < itemCount; index += 1) {
                    const timeout = window.setTimeout(() => {
                        setVisibleItems((currentItems) => {
                            const nextItems = currentItems.slice();
                            nextItems[index] = true;
                            return nextItems;
                        });
                    }, index * delay);

                    timeouts.push(timeout);
                }
            },
            {
                rootMargin: "0px 0px -10% 0px",
                threshold
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            timeouts.forEach((timeout) => window.clearTimeout(timeout));
        };
    }, [itemCount, threshold, delay]);

    return [ref, visibleItems];
}

function easeInOutCubic(progress) {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function animateScrollTo(target, duration = 850) {
    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const step = (currentTime) => {
        if (startTime === null) {
            startTime = currentTime;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

function scrollToSection(targetId) {
    const target = document.getElementById(targetId);

    if (!target) {
        return;
    }

    animateScrollTo(target);
}

function Reveal({ as = "div", className = "", children, ...props }) {
    const [ref, isVisible] = useRevealOnScroll();

    return h(
        as,
        {
            ref,
            className: cx("reveal", isVisible && "is-visible", className),
            ...props
        },
        children
    );
}

function Hero() {
    const handleViewWork = (event) => {
        event.preventDefault();
        scrollToSection("projects");
    };

    return h(
        "section",
        {
            className: cx(
                ui.section,
                "grid min-h-screen place-items-center pb-[78px] pt-[92px] md:pb-[108px] md:pt-24"
            ),
            "aria-labelledby": "hero-title"
        },
        h(
            Reveal,
            { className: "flex w-full max-w-[690px] flex-col items-center text-center" },
            h(
                "p",
                {
                    className:
                        "mb-8 inline-flex items-center rounded-full border border-[#c6cad5] bg-[#eff0f3] px-4 py-[7px] text-sm font-semibold text-[#222336] shadow-[inset_0_-1px_0_rgba(0,0,0,0.05)] md:mb-[42px]"
                },
                "Available for Projects"
            ),
            h("h1", { id: "hero-title", className: "mb-7 text-[26px] font-bold leading-tight tracking-normal text-[#080914] sm:text-[29px] md:text-[32px]" }, "Software Engineer & Developer"),
            h(
                "p",
                { className: "mb-[38px] w-full max-w-[650px] text-base text-[#717386] md:text-[17px]" },
                "Crafting innovative solutions with modern technologies. Passionate about building scalable applications that solve real-world problems."
            ),
            h(
                "div",
                { className: "flex flex-wrap justify-center gap-[18px] max-md:w-full max-md:flex-col max-md:items-stretch", "aria-label": "Primary actions" },
                h("a", { className: ui.primaryButton, href: "#about" }, h(Icon, { name: "mail" }), "Get in Touch"),
                h(
                    "a",
                    {
                        className: ui.secondaryButton,
                        href: "#projects",
                        "data-smooth-scroll": "projects",
                        onClick: handleViewWork
                    },
                    h(Icon, { name: "zap" }),
                    "View Work"
                )
            ),
            h(
                "div",
                { className: "mt-11 flex justify-center gap-3 md:mt-[62px] md:gap-[18px]", "aria-label": "Social links" },
                socialLinks.map(({ label, href, icon, active }) =>
                    h(
                        "a",
                        {
                            className: cx(ui.iconButton, active && ui.activeIconButton),
                            href,
                            "aria-label": label,
                            key: label
                        },
                        h(Icon, { name: icon })
                    )
                )
            )
        )
    );
}

function FeaturedProjects() {
    return h(
        "section",
        {
            className: cx(ui.section, "bg-[#f8f8f9]/95 pb-[72px] pt-[68px] md:pb-[98px] md:pt-[74px]"),
            id: "projects",
            "aria-labelledby": "projects-title"
        },
        h(
            Reveal,
            { className: ui.sectionHeading },
            h("h2", { id: "projects-title", className: ui.sectionTitle }, "Featured Projects"),
            h(
                "p",
                { className: ui.sectionCopy },
                "A selection of projects showcasing my expertise in full-stack development, architecture, and problem-solving."
            )
        ),
        h(
            "div",
            { className: "mx-auto grid w-full max-w-[1215px] grid-cols-1 gap-[22px] md:grid-cols-2 lg:max-w-[900px] xl:max-w-[1215px] xl:grid-cols-3 xl:gap-9" },
            projects.map((project) =>
                h(
                    Reveal,
                    { as: "article", className: ui.projectCard, key: project.title },
                    h("img", {
                        className: "aspect-[1.85/1] w-full object-cover",
                        src: project.image,
                        alt: project.alt
                    }),
                    h(
                        "div",
                        { className: "p-5 pb-[22px] md:p-[27px] md:pb-6" },
                        h("h3", { className: "mb-[13px] text-xl font-bold leading-tight text-[#080914]" }, project.title),
                        h("p", { className: "mb-[18px] min-h-0 text-base text-[#717386] md:min-h-[74px]" }, project.description),
                        h(
                            "div",
                            { className: "mb-[21px] flex flex-wrap gap-2.5", "aria-label": "Project tags" },
                            project.tags.map((tag) =>
                                h("span", { className: "inline-flex min-h-[26px] items-center rounded-full border border-[#c6cad5] bg-[#f9fafb] px-3.5 py-0.5 text-[13px] font-semibold text-[#1d2030]", key: tag }, tag)
                            )
                        ),
                        h(
                            "div",
                            { className: "icon-md flex flex-wrap gap-[18px]" },
                            project.codeUrl &&
                                h("a", { className: "inline-flex items-center gap-2 text-[15px] font-semibold text-[#8b8e9f] transition hover:text-[#080914]", href: project.codeUrl }, h(Icon, { name: "github" }), "Code"),
                            project.demoUrl &&
                                h("a", { className: "inline-flex items-center gap-2 text-[15px] font-semibold text-[#8b8e9f] transition hover:text-[#080914]", href: project.demoUrl }, h(Icon, { name: "external" }), project.demoLabel || "Live Demo")
                        )
                    )
                )
            )
        )
    );
}

function Skills() {
    const [gridRef, visibleSkills] = useStaggeredReveal(skills.length, 0.22, 120);

    return h(
        "section",
        { className: cx(ui.section, "pb-[72px] pt-[68px] md:pb-[95px] md:pt-[88px]"), "aria-labelledby": "skills-title" },
        h(
            Reveal,
            { className: ui.sectionHeading },
            h("h2", { id: "skills-title", className: ui.sectionTitle }, "Skills & Expertise"),
            h("p", { className: ui.sectionCopy }, "Technologies and tools I work with to bring ideas to life.")
        ),
        h(
            "div",
            { className: "mx-auto grid w-full max-w-[1215px] grid-cols-1 gap-[22px] md:grid-cols-3 lg:max-w-[900px] xl:max-w-[1215px] xl:grid-cols-5 xl:gap-[25px]", ref: gridRef },
            skills.map(({ name, icon }, index) =>
                h(
                    "article",
                    {
                        className: cx("reveal", visibleSkills[index] && "is-visible", ui.skillCard),
                        key: name
                    },
                    h("span", { className: "grid h-[51px] w-[51px] place-items-center rounded-[14px] bg-[#e1e3e9]" }, h(Icon, { name: icon })),
                    h("h3", { className: "mb-0 text-base font-medium text-[#080914]" }, name)
                )
            )
        )
    );
}

function About() {
    return h(
        "section",
        { className: cx(ui.section, "bg-[#f8f8f9]/95 pb-[72px] pt-[68px] md:pb-[87px] md:pt-[91px]"), id: "about", "aria-labelledby": "about-title" },
        h(
            Reveal,
            { as: "article", className: "mx-auto w-full max-w-[955px] rounded-2xl border border-[#d9dbe2] bg-white px-6 py-[42px] shadow-[0_22px_34px_rgba(12,13,24,0.13)] md:rounded-[20px] md:px-[51px] md:pb-[54px] md:pt-[61px]" },
            h("h2", { id: "about-title", className: cx(ui.sectionTitle, "text-center") }, "About Me"),
            h(
                "div",
                { className: "text-base text-[#717386] md:text-[17px]" },
                h(
                    "p",
                    { className: "mb-[25px]" },
                    "I'm a passionate software engineer with a love for creating elegant solutions to complex problems. With expertise in modern web technologies and a keen eye for design, I build applications that are both functional and beautiful."
                ),
                h(
                    "p",
                    { className: "mb-[25px]" },
                    "My journey in software development has taught me the importance of clean code, scalable architecture, and user-centric design. I'm constantly learning and exploring new technologies to stay at the forefront of the industry."
                ),
                h(
                    "p",
                    { className: "mb-[25px]" },
                    "I am a third year Software Engineering student at the University of Portsmouth with a strong interest in software engineering, web development, mobile applications, and SaaS development. I combine technical skill with a business minded approach, allowing me to create digital products that do more than function well, they actively improve the way businesses operate, communicate, and grow."
                ),
                h(
                    "p",
                    { className: "mb-[25px]" },
                    "Through both academic work and independent projects, I have developed a strong ability to design and build practical software solutions that solve real problems. Alongside my studies, I have been building my own applications and delivering web development services to clients, focusing on performance, usability, and conversion. This experience has shown me that the most valuable developer is not simply someone who can write code, but someone who understands how technology should support workflow, reduce friction, improve user experience, and contribute to measurable outcomes."
                ),
                h(
                    "p",
                    { className: "mb-0" },
                    "With strong communication skills and a proactive mindset, I am able to work effectively with both technical and non technical people, understand needs quickly, and deliver solutions that are clear, purposeful, and aligned with wider goals. I aim to bring not only development ability, but also reliability, initiative, and a strong understanding of how digital products can create long term value."
                )
            ),
            h("div", { className: "my-[38px] h-px bg-[#dedfe4] md:mb-[38px] md:mt-[52px]" }),
            h("h3", { className: "mb-7 text-center text-xl font-bold text-[#080914]" }, "Let's Connect"),
            h(
                "div",
                { className: "flex flex-wrap justify-center gap-[18px] max-md:w-full max-md:flex-col max-md:items-stretch" },
                h("a", { className: ui.primaryButton, href: "mailto:elucas2005@icloud.com" }, h(Icon, { name: "mail" }), "Get in Touch"),
                h("a", { className: ui.secondaryButton, href: "https://github.com/lucasrbrusu" }, h(Icon, { name: "github" }), "GitHub"),
                h("a", { className: ui.secondaryButton, href: "https://www.linkedin.com/in/lucasrbrusu/" }, h(Icon, { name: "linkedin" }), "LinkedIn")
            )
        )
    );
}

function Footer() {
    return h(
        "footer",
        { className: "border-t border-[#dedfe4] px-6 pb-[45px] pt-12 text-center" },
        h("p", { className: "mb-0 text-[15px] text-[#717386]" }, "\u00a9 2026 Lucas Rusu.")
    );
}

function App() {
    return h(React.Fragment, null, h("main", null, h(Hero), h(FeaturedProjects), h(Skills), h(About)), h(Footer));
}

document.addEventListener("click", (event) => {
    if (event.defaultPrevented) {
        return;
    }

    const link = event.target.closest("[data-smooth-scroll]");

    if (!link) {
        return;
    }

    event.preventDefault();
    scrollToSection(link.dataset.smoothScroll);
});

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
