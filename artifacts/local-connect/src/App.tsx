import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  Backpack,
  Check,
  HandHeart,
  Info,
  Mail,
  MapPin,
  Megaphone,
  Package,
  Phone,
  Plus,
  Search,
  Truck,
  Users,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  type Category,
  localRequests,
  type LocalRequest,
} from '@/data/requests';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const categoryIcons: Record<Category, typeof Package> = {
  'Food & Goods': Package,
  'Volunteer Labor': Users,
  Supplies: Backpack,
  Marketing: Megaphone,
};

function Modal({
  title,
  kicker,
  onClose,
  children,
  footer,
  wide = false,
}: {
  title: string;
  kicker: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="lc-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={`lc-modal ${wide ? 'lc-modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="lc-modal-header">
          <div>
            <div className="lc-modal-kicker">{kicker}</div>
            <h2 className="lc-modal-title" id="modal-title">{title}</h2>
          </div>
          <button className="lc-close" type="button" onClick={onClose} aria-label="Close dialog" data-testid="button-close-modal">
            <X size={17} />
          </button>
        </div>
        {children}
        {footer && <div className="lc-modal-footer">{footer}</div>}
      </section>
    </div>
  );
}

function RequestCard({
  request,
  index,
  onHelp,
}: {
  request: LocalRequest;
  index: number;
  onHelp: (request: LocalRequest) => void;
}) {
  const Icon = categoryIcons[request.category];
  return (
    <article className="lc-card" style={{ animationDelay: `${index * 65}ms` }} data-testid={`card-request-${request.id}`}>
      <div className="lc-card-top">
        <span className="lc-category"><Icon /> {request.category}</span>
        {request.isUrgent && <span className="lc-urgent">Same-day need</span>}
      </div>
      <div className="lc-org" data-testid={`text-organization-${request.id}`}>{request.organizationName}</div>
      <h3 className="lc-card-title">{request.title}</h3>
      <p className="lc-description">{request.description}</p>
      <div className="lc-facts">
        <div className="lc-fact">
          <span className="lc-fact-label">Looking for</span>
          <span className="lc-fact-value">{request.quantityNeeded}</span>
        </div>
        <div className="lc-fact">
          <span className="lc-fact-label">Timing</span>
          <span className="lc-fact-value">{request.timeframe}</span>
        </div>
      </div>
      <div className="lc-logistics">
        {request.logistics === 'Pick-up Available' ? <Truck size={15} /> : <MapPin size={15} />}
        {request.logistics}
      </div>
      <div className="lc-requirements">
        {request.requirements.map((requirement) => <span className="lc-requirement" key={requirement}>{requirement}</span>)}
      </div>
      <button className="lc-help-button" type="button" onClick={() => onHelp(request)} data-testid={`button-help-${request.id}`}>
        I Can Help <ArrowRight size={15} />
      </button>
    </article>
  );
}

function HelpModal({ request, onClose }: { request: LocalRequest; onClose: () => void }) {
  const subject = `I can help with: ${request.title}`;
  const body = `Hi ${request.contactPerson},\n\nI saw your Local Connect request for "${request.title}" and would love to help.\n\n[Share how you can help here]\n\nThank you!`;
  return (
    <Modal
      title="Make a local connection"
      kicker="You found a way in"
      onClose={onClose}
      wide
      footer={<button className="lc-primary-button" type="button" onClick={onClose} data-testid="button-done-help">Done <Check size={15} /></button>}
    >
      <div className="lc-modal-body">
        <div className="lc-detail-org">{request.organizationName} · {request.contactPerson}</div>
        <p className="lc-detail-description">{request.description}</p>
        <div className="lc-detail-grid">
          <div className="lc-detail-block"><h4>Need</h4><p>{request.quantityNeeded}</p></div>
          <div className="lc-detail-block"><h4>By</h4><p>{request.timeframe}</p></div>
          <div className="lc-detail-block"><h4>Logistics</h4><p>{request.logistics}</p></div>
          <div className="lc-detail-block"><h4>Category</h4><p>{request.category}</p></div>
        </div>
        <div className="lc-detail-block" style={{ marginBottom: '20px' }}>
          <h4>Helpful to know</h4>
          <ul className="lc-detail-requirements">
            {request.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
          </ul>
        </div>
        <div className="lc-contact-row">
          <a className="lc-contact-link" href={`mailto:${request.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} data-testid="link-contact-email"><Mail size={15} /> Email {request.contactPerson}</a>
          <a className="lc-contact-link" href={`tel:${request.contactPhone.replace(/\D/g, '')}`} data-testid="link-contact-phone"><Phone size={15} /> {request.contactPhone}</a>
        </div>
        <div className="lc-notice"><Info size={16} /> <span>No login required. Contacting the non-profit directly will initiate coordination.</span></div>
      </div>
    </Modal>
  );
}

function PostNeedModal({ onClose }: { onClose: () => void }) {
  const [details, setDetails] = useState('');

  return (
    <Modal
      title="Put a need on the board"
      kicker="For Harrisonburg nonprofits"
      onClose={onClose}
      footer={<button className="lc-secondary-button" type="button" onClick={onClose} data-testid="button-close-post-need">Close</button>}
    >
      <div className="lc-modal-body">
        <p className="lc-instructions">Send us the details below and we will format your request for the Local Connect board. This keeps every need clear, current, and easy for a busy local business to act on.</p>
        <div className="lc-email-callout">
          <Mail size={20} />
          <div><small>Submit requests to</small><a href="mailto:hello@localconnecthburg.org" data-testid="link-submit-email">hello@localconnecthburg.org</a></div>
        </div>
        <div className="lc-detail-block">
          <label className="lc-field-label" htmlFor="need-details">Include these details</label>
          <textarea
            id="need-details"
            className="lc-details-input"
            rows={7}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            placeholder={'Your organization, contact name, email, and phone\nA short title and description of the need\nCategory, quantity, timeframe, and logistics\nRequirements, helper notes, and same-day urgency'}
            data-testid="input-need-details"
          />
          <p className="lc-field-hint">You can type or paste the request details here before sending them to the submission email above.</p>
        </div>
        <p className="lc-instructions" style={{ marginTop: '18px', marginBottom: 0 }}>We welcome needs from nonprofits serving Harrisonburg, Rockingham County, and the surrounding Shenandoah Valley.</p>
      </div>
    </Modal>
  );
}

function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [logistics, setLogistics] = useState('All logistics');
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LocalRequest | null>(null);
  const [postNeedOpen, setPostNeedOpen] = useState(false);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();
    return localRequests.filter((request) => {
      const searchable = [request.organizationName, request.title, request.description, request.category, ...request.requirements].join(' ').toLowerCase();
      return (!query || searchable.includes(query))
        && (category === 'All categories' || request.category === category)
        && (logistics === 'All logistics' || request.logistics === logistics)
        && (!urgentOnly || request.isUrgent);
    });
  }, [search, category, logistics, urgentOnly]);

  const resetFilters = () => {
    setSearch('');
    setCategory('All categories');
    setLogistics('All logistics');
    setUrgentOnly(false);
  };

  return (
    <div className="lc-page">
      <header className="lc-header">
        <div className="lc-header-inner">
          <div className="lc-header-nav">
            <a className="lc-brand" href="/" data-testid="link-home">
              <span className="lc-mark"><HandHeart size={22} strokeWidth={2.2} /></span>
              <span><span className="lc-brand-name">Local Connect</span><span className="lc-brand-sub">Harrisonburg, Virginia</span></span>
            </a>
            <button className="lc-post-button" type="button" onClick={() => setPostNeedOpen(true)} data-testid="button-post-need"><Plus size={15} /> Post a Need</button>
          </div>
          <div className="lc-kicker">A bulletin board for showing up</div>
          <h1 className="lc-title">Good things are<br /><em>close by.</em></h1>
          <p className="lc-intro">Find a practical way to help a Harrisonburg nonprofit today. Browse local needs, connect directly, and make the next useful thing happen.</p>
        </div>
      </header>

      <main className="lc-main">
        <section className="lc-filter-rail" aria-label="Filter local needs">
          <div className="lc-filter-grid">
            <div className="lc-input-wrap">
              <Search size={17} />
              <label className="sr-only" htmlFor="request-search">Search local needs</label>
              <input id="request-search" className="lc-input" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search needs, nonprofits, or keywords" data-testid="input-search" />
            </div>
            <div>
              <label className="sr-only" htmlFor="category-filter">Filter by category</label>
              <select id="category-filter" className="lc-select" value={category} onChange={(event) => setCategory(event.target.value)} data-testid="select-category">
                <option>All categories</option>
                <option>Food &amp; Goods</option>
                <option>Volunteer Labor</option>
                <option>Supplies</option>
                <option>Marketing</option>
              </select>
            </div>
            <div>
              <label className="sr-only" htmlFor="logistics-filter">Filter by logistics</label>
              <select id="logistics-filter" className="lc-select" value={logistics} onChange={(event) => setLogistics(event.target.value)} data-testid="select-logistics">
                <option>All logistics</option>
                <option>Pick-up Available</option>
                <option>Drop-off Required</option>
              </select>
            </div>
            <button className="lc-toggle" type="button" data-active={urgentOnly} onClick={() => setUrgentOnly((current) => !current)} aria-pressed={urgentOnly} data-testid="button-urgent-filter"><span className="lc-toggle-dot" /> Same-day only</button>
          </div>
        </section>

        <div className="lc-feed-head">
          <h2 className="lc-feed-title">Current needs</h2>
          <div className="lc-feed-count" data-testid="text-result-count">{filteredRequests.length} of {localRequests.length} requests</div>
        </div>
        <section className="lc-grid" aria-live="polite" aria-label="Local nonprofit requests">
          {filteredRequests.length > 0 ? filteredRequests.map((request, index) => <RequestCard key={request.id} request={request} index={index} onHelp={setSelectedRequest} />) : (
            <div className="lc-empty" data-testid="empty-results">
              <div className="lc-empty-icon"><Search size={22} /></div>
              <h3>Nothing matches this search.</h3>
              <p>Try a broader phrase or clear a filter. There are good ways to help still waiting nearby.</p>
              <button className="lc-reset" type="button" onClick={resetFilters} data-testid="button-reset-filters">Clear all filters</button>
            </div>
          )}
        </section>
      </main>
      <footer className="lc-footer"><span><strong>Local Connect</strong> · Neighbors making the next good thing easier.</span><span>Built for Harrisonburg, VA</span></footer>

      {selectedRequest && <HelpModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />}
      {postNeedOpen && <PostNeedModal onClose={() => setPostNeedOpen(false)} />}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;