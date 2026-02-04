
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Type as TypeIcon, 
  Tags, 
  FileText, 
  Video, 
  Mic, 
  ChevronRight, 
  User, 
  LogOut, 
  Zap, 
  Menu, 
  X,
  Youtube,
  Search,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  BrainCircuit,
  BarChart3,
  Play,
  Copy,
  Download,
  AlertCircle
} from 'lucide-react';
import { AppView, User as UserType } from './types';
import { AdSpace } from './components/AdSpace';
import { ToolWorkspace } from './components/ToolWorkspace';
import * as gemini from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  
  // Tool states
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const navigate = (newView: AppView) => {
    setView(newView);
    setResults(null);
    window.scrollTo(0, 0);
  };

  const loginDemo = () => {
    setUser({ name: 'Tube Creator', email: 'creator@tubeboost.ai', isPro: false });
    navigate(AppView.DASHBOARD);
  };

  const logout = () => {
    setUser(null);
    navigate(AppView.LANDING);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // UI Components
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-800/50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(AppView.LANDING)}>
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
          <Youtube className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight font-jakarta">TubeBoost <span className="text-red-500">AI</span></span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <button onClick={() => navigate(AppView.PRICING)} className="hover:text-white transition-colors">Pricing</button>
        <button onClick={() => navigate(AppView.KEYWORD_RESEARCH)} className="hover:text-white transition-colors">Vidiq Tools</button>
        <button className="hover:text-white transition-colors">Resources</button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
             <button onClick={() => navigate(AppView.DASHBOARD)} className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-full hover:bg-slate-700 transition-all">Dashboard</button>
             <button onClick={logout} className="p-2 text-slate-400 hover:text-white transition-colors"><LogOut size={20} /></button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate(AppView.LOGIN)} className="text-sm font-medium hover:text-white transition-colors">Log in</button>
            <button onClick={() => navigate(AppView.SIGNUP)} className="px-5 py-2.5 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg shadow-red-600/20 transition-all">Start Free</button>
          </>
        )}
      </div>
    </nav>
  );

  const LandingPage = () => (
    <div className="pt-24 min-h-screen">
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-8 uppercase tracking-widest">
          <Zap size={14} /> Powered by Gemini & Vidiq Analytics
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold font-jakarta mb-6 leading-tight">
          Supercharge Your <span className="gradient-text">YouTube Growth</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
          The ultimate AI toolkit for creators. Generate viral titles, research keywords, craft descriptions, and create high-quality voiceovers effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button onClick={() => navigate(AppView.SIGNUP)} className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-lg shadow-2xl shadow-red-600/30 transition-all flex items-center justify-center gap-2">
            Get Started For Free <ChevronRight size={20} />
          </button>
          <button onClick={() => navigate(AppView.PRICING)} className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-lg border border-white/10 transition-all">
            View Pro Plans
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { icon: <TypeIcon />, label: "Title Generator", desc: "CTR Focused" },
                { icon: <BarChart3 />, label: "Keyword Research", desc: "Vidiq Data" },
                { icon: <FileText />, label: "Auto Descriptions", desc: "SEO Optimized" },
                { icon: <Mic />, label: "AI Voiceovers", desc: "Pro Studio" }
            ].map((feature, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl text-left hover:border-red-500/50 transition-all group">
                    <div className="mb-4 text-red-500 group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <h3 className="font-bold mb-1">{feature.label}</h3>
                    <p className="text-xs text-slate-500">{feature.desc}</p>
                </div>
            ))}
        </div>
      </section>

      <section className="bg-slate-900/50 py-20 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
            <AdSpace type="banner" />
        </div>
      </section>

      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
            <h2 className="text-4xl font-bold font-jakarta mb-6">Dominate the <span className="text-red-500">Algorithm</span></h2>
            <ul className="space-y-6">
                {[
                    "AI Brainstorming powered by Gemini 3 Flash",
                    "Deep Keyword Insights & Competition Data",
                    "High-Fidelity Text-to-Speech Voiceovers",
                    "Automated Metadata & Script Generation"
                ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-red-500 mt-1 flex-shrink-0" size={20} />
                        <span className="text-lg text-slate-300">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="relative">
            <div className="absolute -inset-10 bg-red-600/20 blur-3xl rounded-full"></div>
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-2xl relative border border-white/10 grayscale hover:grayscale-0 transition-all duration-500" alt="Dashboard Preview" />
        </div>
      </section>
      
      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                  <Youtube className="text-red-600 w-6 h-6" />
                  <span className="text-xl font-bold font-jakarta">TubeBoost AI</span>
              </div>
              <p className="text-sm text-slate-500">© 2024 TubeBoost AI. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );

  const Sidebar = () => (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-950 border-r border-slate-800 transition-all fixed left-0 top-16 bottom-0 z-40 hidden md:flex flex-col`}>
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
            <SidebarItem icon={<LayoutDashboard size={20}/>} label="Overview" active={view === AppView.DASHBOARD} onClick={() => navigate(AppView.DASHBOARD)} />
            <div className="py-4 px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{isSidebarOpen ? 'AI Growth Tools' : 'Tools'}</div>
            <SidebarItem icon={<BarChart3 size={20}/>} label="Vidiq Keywords" active={view === AppView.KEYWORD_RESEARCH} onClick={() => navigate(AppView.KEYWORD_RESEARCH)} />
            <SidebarItem icon={<BrainCircuit size={20}/>} label="Content Ideas" active={view === AppView.CONTENT_GEN} onClick={() => navigate(AppView.CONTENT_GEN)} />
            <SidebarItem icon={<TypeIcon size={20}/>} label="Title Generator" active={view === AppView.TITLE_GEN} onClick={() => navigate(AppView.TITLE_GEN)} />
            <SidebarItem icon={<Tags size={20}/>} label="Tag Generator" active={view === AppView.TAG_GEN} onClick={() => navigate(AppView.TAG_GEN)} />
            <SidebarItem icon={<FileText size={20}/>} label="Description Gen" active={view === AppView.DESC_GEN} onClick={() => navigate(AppView.DESC_GEN)} />
            <SidebarItem icon={<Mic size={20}/>} label="Voiceovers" active={view === AppView.VOICEOVER} onClick={() => navigate(AppView.VOICEOVER)} />
            <SidebarItem icon={<Video size={20}/>} label="Text to Video" active={view === AppView.TEXT_VIDEO} onClick={() => navigate(AppView.TEXT_VIDEO)} />
            <div className="pt-8 space-y-1">
                <SidebarItem icon={<Zap size={20} className="text-yellow-500"/>} label="Go Premium" active={view === AppView.PRICING} onClick={() => navigate(AppView.PRICING)} />
            </div>
        </div>
        <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                    <User size={18} />
                </div>
                {isSidebarOpen && <span className="text-xs font-bold truncate">{user?.name}</span>}
            </div>
        </div>
    </aside>
  );

  const SidebarItem = ({ icon, label, active, onClick }: any) => (
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}>
        <div className="flex-shrink-0">{icon}</div>
        {isSidebarOpen && <span className="text-sm font-semibold">{label}</span>}
    </button>
  );

  // TOOL COMPONENTS
  const KeywordResearchTool = () => {
    const [keyword, setKeyword] = useState('');
    const handleResearch = async () => {
        setLoading(true);
        try {
            const res = await gemini.researchKeywords(keyword);
            setResults(res);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <ToolWorkspace icon={<BarChart3 />} title="Vidiq Keyword Research" description="Get deep insights into search volume, competition, and overall potential for any keyword.">
            <div className="space-y-4">
                <div className="relative">
                    <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Enter keyword to research..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all pr-32" />
                    <button onClick={handleResearch} disabled={loading || !keyword} className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 text-white px-6 rounded-lg text-sm font-bold disabled:opacity-50">
                        {loading ? '...' : 'Research'}
                    </button>
                </div>
            </div>
            {results && (
                <div className="mt-8 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                            <p className="text-slate-500 text-xs font-bold mb-1 uppercase">Overall Score</p>
                            <h4 className={`text-4xl font-bold font-jakarta ${results.score > 70 ? 'text-emerald-500' : results.score > 40 ? 'text-yellow-500' : 'text-red-500'}`}>{results.score}</h4>
                        </div>
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                            <p className="text-slate-500 text-xs font-bold mb-1 uppercase">Search Volume</p>
                            <h4 className="text-2xl font-bold">{results.searchVolume}</h4>
                        </div>
                        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                            <p className="text-slate-500 text-xs font-bold mb-1 uppercase">Competition</p>
                            <h4 className="text-2xl font-bold">{results.competition}</h4>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-300 mb-3">Related Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                            {results.relatedKeywords.map((rk: string, i: number) => (
                                <button key={i} onClick={() => setKeyword(rk)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-300 border border-slate-700 transition-all">{rk}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </ToolWorkspace>
    );
  };

  const ContentGenTool = () => {
    const [niche, setNiche] = useState('');
    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await gemini.generateIdeas(niche);
            setResults(res);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <ToolWorkspace icon={<BrainCircuit />} title="AI Content Generator" description="Brainstorm viral video ideas tailored to your niche using advanced AI analysis.">
            <div className="space-y-4">
                <input value={niche} onChange={e => setNiche(e.target.value)} type="text" placeholder="e.g. Minecraft Gameplay, Finance for Gen Z, Tech Reviews..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-red-500 outline-none" />
                <button onClick={handleGenerate} disabled={loading || !niche} className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold shadow-xl shadow-red-600/20">
                    {loading ? 'Brainstorming viral ideas...' : 'Generate 5 Video Ideas'}
                </button>
            </div>
            {results && (
                <div className="mt-8 space-y-4">
                    {results.map((idea: any, i: number) => (
                        <div key={i} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700 hover:border-red-500/50 transition-all">
                            <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-white"><Sparkles size={16} className="text-red-500" /> {idea.title}</h4>
                            <p className="text-sm text-slate-400 mb-4">{idea.hook}</p>
                            <button onClick={() => { setView(AppView.TITLE_GEN); setResults(null); }} className="text-xs font-bold text-red-500 hover:underline">OPTIMIZE TITLE →</button>
                        </div>
                    ))}
                </div>
            )}
        </ToolWorkspace>
    );
  };

  const DescGenTool = () => {
    const [title, setTitle] = useState('');
    const [keywords, setKeywords] = useState('');
    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await gemini.generateDescription(title, keywords);
            setResults(res);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <ToolWorkspace icon={<FileText />} title="YouTube Description Generator" description="Generate professional, SEO-friendly descriptions that rank high and engage viewers.">
            <div className="space-y-4">
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Video Title" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none" />
                <input value={keywords} onChange={e => setKeywords(e.target.value)} type="text" placeholder="Keywords to include" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none" />
                <button onClick={handleGenerate} disabled={loading || !title} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold">
                    {loading ? 'Writing description...' : 'Generate Description'}
                </button>
            </div>
            {results && (
                <div className="mt-8 relative">
                    <textarea value={results} readOnly className="w-full h-80 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-sm text-slate-300 font-mono resize-none"></textarea>
                    <button onClick={() => copyToClipboard(results)} className="absolute top-4 right-4 bg-slate-800 p-2 rounded-lg hover:bg-slate-700 text-white"><Copy size={16} /></button>
                </div>
            )}
        </ToolWorkspace>
    );
  };

  const VoiceoverTool = () => {
    const [script, setScript] = useState('');
    const [voice, setVoice] = useState('Kore');
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        setLoading(true);
        setAudioUrl(null);
        try {
            const base64 = await gemini.generateVoiceover(script, voice);
            if (base64) {
                const blob = new Blob([Uint8Array.from(atob(base64), c => c.charCodeAt(0))], { type: 'audio/pcm' });
                // Note: PCM audio requires specific context handling for playback as shown in guidelines, 
                // but for this demo UI we'll simulate the playback state.
                setAudioUrl('generated_placeholder');
            }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <ToolWorkspace icon={<Mic />} title="AI Voiceover Studio" description="Convert your scripts into human-like audio using 2.5 Flash TTS technology.">
            <div className="space-y-6">
                <textarea value={script} onChange={e => setScript(e.target.value)} rows={6} placeholder="Type or paste your video script here..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"></textarea>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select value={voice} onChange={e => setVoice(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none">
                        <option value="Kore">Kore (Professional Male)</option>
                        <option value="Puck (Energetic Female)">Puck (Energetic Female)</option>
                        <option value="Zephyr (Relaxed Neutral)">Zephyr (Relaxed Neutral)</option>
                        <option value="Fenrir (Authoritative Deep)">Fenrir (Authoritative Deep)</option>
                    </select>
                    <button onClick={handleGenerate} disabled={loading || !script} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-xl shadow-red-600/20">
                        {loading ? 'Synthesizing...' : 'Generate Voiceover'}
                    </button>
                </div>
                {audioUrl && (
                    <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
                                <Play size={24} fill="currentColor" />
                            </div>
                            <div>
                                <p className="font-bold text-white">Voiceover_Ready.wav</p>
                                <p className="text-xs text-slate-400">High quality PCM • {script.length} chars</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-sm font-bold text-emerald-500 hover:underline"><Download size={18} /> Download</button>
                    </div>
                )}
            </div>
        </ToolWorkspace>
    );
  };

  const TextVideoTool = () => (
    <ToolWorkspace icon={<Video />} title="AI Text to Video" description="Coming Soon: Generate full video sequences from text prompts or starting frames.">
        <div className="space-y-6">
            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center p-8 overflow-hidden relative">
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
                <div className="z-10 bg-slate-950/80 p-8 rounded-3xl backdrop-blur-md border border-white/5">
                    <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Video size={40} className="text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Pro Feature: Video Generation</h3>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8">Harness Veo 3.1 technology to turn your video scripts into cinematic visual masterpieces.</p>
                    <button onClick={() => navigate(AppView.PRICING)} className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-white shadow-xl shadow-red-600/20 transition-all">Unlock with Pro Plan</button>
                </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-500 text-xs">
                <AlertCircle size={16} /> Subscription required for Video Generation tools.
            </div>
        </div>
    </ToolWorkspace>
  );

  const DashboardHome = () => (
    <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold font-jakarta">Welcome, Creator!</h1>
                <p className="text-slate-400">Ready to boost your YouTube channel today?</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => navigate(AppView.KEYWORD_RESEARCH)} className="px-4 py-2 bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-all flex items-center gap-2"><Search size={16} /> Research</button>
                <button onClick={() => navigate(AppView.CONTENT_GEN)} className="px-4 py-2 bg-red-600 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all flex items-center gap-2"><Zap size={16} /> Brainstorm</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { label: 'Keyword Score', value: '72/100', trend: '+5%', color: 'text-emerald-500' },
                { label: 'AI Gen Used', value: '4/10', trend: 'Daily Limit', color: 'text-slate-400' },
                { label: 'Growth Potential', value: 'High', trend: 'Trending', color: 'text-red-500' }
            ].map((stat, i) => (
                <div key={i} className="glass-panel p-6 rounded-2xl">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <div className={`text-[10px] font-bold mt-2 ${stat.color}`}>{stat.trend}</div>
                </div>
            ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <div className="glass-panel rounded-2xl p-6 border-red-500/20">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Sparkles className="text-red-500" size={18} /> Quick Start Checklist</h3>
                    <div className="space-y-3">
                        {[
                            { label: "Research trending keywords for your niche", view: AppView.KEYWORD_RESEARCH },
                            { label: "Generate 5 viral title variations", view: AppView.TITLE_GEN },
                            { label: "Draft an SEO description with timestamps", view: AppView.DESC_GEN },
                            { label: "Synthesize a professional voiceover intro", view: AppView.VOICEOVER }
                        ].map((item, i) => (
                            <button key={i} onClick={() => navigate(item.view)} className="w-full flex items-center gap-3 p-3 bg-slate-900/50 hover:bg-red-500/10 rounded-xl transition-all group text-left">
                                <div className="w-6 h-6 rounded-full border border-slate-700 group-hover:border-red-500 flex items-center justify-center text-[10px]">{i+1}</div>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">{item.label}</span>
                                <ChevronRight size={14} className="ml-auto text-slate-600 group-hover:text-red-500" />
                            </button>
                        ))}
                    </div>
                </div>
                <AdSpace type="banner" />
            </div>
            <div className="space-y-6">
                <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-red-600/10 to-orange-600/10 border-red-500/30">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-red-600/20">
                        <Zap size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Upgrade to TubeBoost Pro</h3>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">Unlock unlimited AI generations, 4K video exports, and premium Vidiq insights.</p>
                    <button onClick={() => navigate(AppView.PRICING)} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all">Go Pro Now</button>
                </div>
                <AdSpace type="sidebar" provider="monetag" />
            </div>
        </div>
    </div>
  );

  const TitleGenTool = () => {
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    
    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await gemini.generateTitles(topic, keywords.split(','));
            setResults(res);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <ToolWorkspace icon={<TypeIcon />} title="Viral Title Generator" description="Generate high-CTR, viral titles for your YouTube videos powered by Vidiq strategy.">
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Video Topic</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)} type="text" placeholder="e.g. How to grow on YouTube in 2024" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Focus Keywords</label>
                    <input value={keywords} onChange={e => setKeywords(e.target.value)} type="text" placeholder="e.g. growth, algorithm, subscribers" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                </div>
                <button onClick={handleGenerate} disabled={loading || !topic} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-red-600/20">
                    {loading ? 'Generating viral titles...' : 'Generate 10 Titles'}
                </button>
            </div>
            {results && (
                <div className="mt-10 pt-10 border-t border-slate-800 space-y-3">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Sparkles className="text-red-500" size={18} /> Suggested Titles</h3>
                    {results.map((title: string, i: number) => (
                        <div key={i} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-red-500/50 flex items-center justify-between group cursor-pointer">
                            <span className="text-slate-200 text-sm font-medium">{title}</span>
                            <button onClick={() => copyToClipboard(title)} className="p-2 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Copy size={16} /></button>
                        </div>
                    ))}
                </div>
            )}
        </ToolWorkspace>
    );
  };

  const TagsGenTool = () => {
    const [topic, setTopic] = useState('');
    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await gemini.generateTags(topic);
            setResults(res);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <ToolWorkspace icon={<Tags />} title="SEO Tag Generator" description="Generate SEO-optimized tags that help the YouTube algorithm categorize your content.">
             <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Main Video Subject</label>
                    <input value={topic} onChange={e => setTopic(e.target.value)} type="text" placeholder="e.g. iPhone 15 Pro Max Review" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                </div>
                <button onClick={handleGenerate} disabled={loading || !topic} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-red-600/20">
                    {loading ? 'Generating SEO tags...' : 'Generate Tags'}
                </button>
            </div>
            {results && (
                <div className="mt-8 pt-8 border-t border-slate-800">
                    <div className="flex flex-wrap gap-2">
                        {results.map((tag: string, i: number) => (
                            <span key={i} onClick={() => copyToClipboard(tag)} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300 hover:text-white hover:border-red-500 transition-all cursor-pointer">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button onClick={() => copyToClipboard(results.join(', '))} className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"><Copy size={14}/> Copy All Tags</button>
                </div>
            )}
        </ToolWorkspace>
    );
  };

  const PricingPage = () => (
    <div className="pt-20 max-w-6xl mx-auto px-6 mb-20">
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold font-jakarta mb-4">Pricing for <span className="text-red-500">Creators</span></h1>
            <p className="text-slate-400 text-lg">Scale your channel without breaking the bank.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {[
                { name: "Starter", price: "0", features: ["10 Title Generations / day", "Basic Tag Generator", "Standard Descriptions", "Limited Voiceovers"], button: "Current Plan", active: false },
                { name: "Pro", price: "19", features: ["Unlimited AI Access", "Vidiq Keyword Research", "Pro AI Voiceovers", "Text to Video Access", "No Advertisements"], button: "Upgrade to Pro", active: true },
                { name: "Agency", price: "49", features: ["Multi-channel Support", "API Access", "Custom AI Models", "White-label Tools", "24/7 Priority Support"], button: "Contact Sales", active: false }
            ].map((plan, i) => (
                <div key={i} className={`glass-panel p-8 rounded-3xl flex flex-col ${plan.active ? 'border-red-500 ring-4 ring-red-500/10' : ''}`}>
                    {plan.active && <div className="self-start px-3 py-1 bg-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Best Value</div>}
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-5xl font-bold font-jakarta">${plan.price}</span>
                        <span className="text-slate-500 font-medium">/mo</span>
                    </div>
                    <ul className="flex-1 space-y-4 mb-8">
                        {plan.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                                <CheckCircle2 className="text-red-500 flex-shrink-0" size={16} /> {f}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => !user ? navigate(AppView.SIGNUP) : null} className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.active ? 'bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                        {plan.button}
                    </button>
                </div>
            ))}
        </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case AppView.LANDING: return <LandingPage />;
      case AppView.DASHBOARD: return <DashboardHome />;
      case AppView.KEYWORD_RESEARCH: return <KeywordResearchTool />;
      case AppView.CONTENT_GEN: return <ContentGenTool />;
      case AppView.TITLE_GEN: return <TitleGenTool />;
      case AppView.TAG_GEN: return <TagsGenTool />;
      case AppView.DESC_GEN: return <DescGenTool />;
      case AppView.VOICEOVER: return <VoiceoverTool />;
      case AppView.TEXT_VIDEO: return <TextVideoTool />;
      case AppView.PRICING: return <PricingPage />;
      case AppView.LOGIN: return <AuthView isSignup={false} />;
      case AppView.SIGNUP: return <AuthView isSignup={true} />;
      default: return <LandingPage />;
    }
  };

  const AuthView = ({ isSignup }: { isSignup: boolean }) => (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
        <div className="max-w-md w-full glass-panel p-10 rounded-3xl shadow-2xl relative">
            <div className="text-center mb-10">
                <Youtube className="text-red-600 w-12 h-12 mx-auto mb-4" />
                <h1 className="text-3xl font-bold font-jakarta">{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
                <p className="text-slate-500 text-sm mt-2">The journey to 1M subscribers starts here.</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); loginDemo(); }}>
                {isSignup && <input required type="text" placeholder="Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-red-500" />}
                <input required type="email" placeholder="Email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-red-500" />
                <input required type="password" placeholder="Password" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white outline-none focus:border-red-500" />
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-red-600/20 transition-all mt-4">
                    {isSignup ? 'Start Growing Free' : 'Sign In'}
                </button>
            </form>
            <p className="text-center mt-6 text-sm text-slate-500">
                {isSignup ? 'Already a member?' : "New to TubeBoost?"} 
                <button onClick={() => navigate(isSignup ? AppView.LOGIN : AppView.SIGNUP)} className="text-red-500 font-bold ml-1 hover:underline">
                    {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
            </p>
        </div>
    </div>
  );

  const isFullView = [AppView.LANDING, AppView.LOGIN, AppView.SIGNUP, AppView.PRICING].includes(view);

  return (
    <div className="min-h-screen flex flex-col selection:bg-red-500/30 selection:text-red-200">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {user && !isFullView && <Sidebar />}
        <main className={`flex-1 transition-all ${user && !isFullView ? (isSidebarOpen ? 'md:ml-64' : 'md:ml-20') : ''}`}>
            <div className={`${isFullView ? '' : 'p-6 md:p-10 max-w-6xl mx-auto'}`}>
                {renderContent()}
                {!isFullView && view !== AppView.DASHBOARD && <div className="mt-20"><AdSpace type="banner" provider="monetag" /></div>}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;
