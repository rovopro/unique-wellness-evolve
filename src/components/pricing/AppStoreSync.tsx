import { motion } from 'framer-motion';
import { Apple, Smartphone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { actions } from './types';

const AppStoreSync = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="section-padding"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="card-wellness text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Apple className="w-5 h-5 text-foreground" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-foreground" />
            </div>
          </div>

          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Subscribed in the App Store?
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            If you subscribed through Apple App Store or Google Play, sign in to sync your subscription status and access web features.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              size="lg"
              className="rounded-xl"
              onClick={() => alert('[Placeholder] Sign in to sync access')}
            >
              Sign in to sync access
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl"
              onClick={actions.syncAppStoreSubscription}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Restore Purchases
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            App Store subscriptions are managed by Apple / Google. We mirror your status for access control.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AppStoreSync;
