import React from 'react';
import { toast } from 'crisp-toast';

// Styling for the grid - you can move this to a CSS file
const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '12px',
    width: '100%',
    maxWidth: '900px',
    margin: '1rem auto'
};

const ToastShowcase = ({ currentConfig = {} }) => {

    // Waterfall Demo Logic
    const handleWaterfall = () => {
        const variants = ['flat', 'solid', 'bordered'];
        const colors = ['primary', 'success', 'danger'];

        [0, 1, 2].forEach((i) => {
            setTimeout(() => {
                toast({
                    ...currentConfig,
                    color: colors[i],
                    variant: variants[i],
                    title: `Waterfall ${i + 1}`,
                    description: "Testing radius and variant combinations.",
                });
            }, i * 200);
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Label Section */}
            <div style={{
                width: '100%',
                maxWidth: '900px',
                margin: '2rem auto -1rem',
                opacity: 0.5,
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textAlign: 'center',
                marginBottom: '1rem'
            }}>
                Quick Presets & Feature Demos
            </div>

            {/* Demo Grid */}
            <div style={gridStyles} className="demo-grid">

                {/* Current Config */}
                <button className="btn-trigger" onClick={() => toast({ ...currentConfig, title: 'Simple Announcement' })}>
                    Current Config
                </button>

                {/* Description Demo */}
                <button className="btn-trigger primary" onClick={() => toast({ ...currentConfig, title: 'With Description', description: 'This toast includes some extra details about the event.' })}>
                    Description Demo
                </button>

                {/* EndContent Demo */}
                <button className="btn-trigger success" onClick={() =>
                    toast({
                        ...currentConfig,
                        title: "File deleted",
                        description: "You can undo this action.",
                        endContent: `
                            <button 
                            style="
                                background:#fff;
                                color:#000;
                                border:none;
                                padding:4px 10px;
                                border-radius:6px;
                                cursor:pointer;
                                font-weight:600"
                            onclick="alert('Undo clicked')">Undo</button>
                        `
                    })
                }>
                    EndContent Demo
                </button>

                {/* Custom Icon Demo */}
                <button className="btn-trigger warning" onClick={() => toast.warning({ ...currentConfig, title: 'Custom Icon', icon: '🚀' })}>
                    Custom Icon
                </button>

                {/* Custom Styling Demo */}
                <button
                    className="btn-trigger secondary"
                    onClick={() => toast({
                        ...currentConfig,
                        title: 'Custom Styles',
                        customStyle: {
                            borderLeft: '4px solid #f06',
                            boxShadow: '0 0 20px rgba(255, 0, 102, 0.2)'
                        }
                    })}
                >
                    Styling Demo
                </button>

                {/* Hidden Icon Demo */}
                <button className="btn-trigger danger" onClick={() => toast.error({
                    ...currentConfig,
                    title: 'Hidden Icon Demo',
                    icon: false,
                    variant: 'flat',
                    color: 'danger',
                    radius: 'lg',
                    description: 'The icon is hidden via props.'
                })}>
                    Hidden Icon
                </button>

                {/* Waterfall / Mix Demo */}
                <button
                    className="btn-trigger"
                    style={{
                        background: 'linear-gradient(45deg, #f06, #4a90e2)',
                        color: 'white',
                        border: 'none'
                    }}
                    onClick={handleWaterfall}
                >
                    Feature Mix
                </button>
            </div>
        </div>
    );
};

export default ToastShowcase;