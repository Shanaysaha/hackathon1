import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Upload as UploadIcon, Camera, FileText, Image as ImageIcon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

export const Upload: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [isDragging, setIsDragging] = useState(false)

  const handleUpload = () => {
    setTimeout(() => navigate('/solve/analyzing'), 600)
  }

  const methods = [
    { icon: <ImageIcon size={36} />, label: 'Upload Image', desc: 'PNG, JPG up to 10MB', gradient: `linear-gradient(135deg, ${colors.accent}20, ${colors.accent}08)` },
    { icon: <Camera size={36} />, label: 'Take Photo', desc: 'Use your camera', gradient: `linear-gradient(135deg, ${colors.info}20, ${colors.info}08)` },
    { icon: <FileText size={36} />, label: 'Type Question', desc: 'Enter manually', gradient: `linear-gradient(135deg, ${colors.success}20, ${colors.success}08)` },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[5], position: 'relative', zIndex: 1, width: '100%' }}>
      <Particles />
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} style={{ textAlign: 'center', marginBottom: spacing[2] }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} style={{ fontSize: '56px', marginBottom: spacing[3] }}>📸</motion.div>
        <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], letterSpacing: '-0.5px' }}>Upload Your Doubt</h1>
        <p style={{ fontSize: typography.sizes.lg, color: colors.textSecondary }}>Take a photo or upload an image of your problem</p>
      </motion.div>

      {/* Drop zone */}
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} onDragEnter={() => setIsDragging(true)} onDragLeave={() => setIsDragging(false)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUpload() }}>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <motion.div
            animate={{ borderColor: isDragging ? colors.accent : colors.border, background: isDragging ? colors.accentLight : colors.cardBg }}
            style={{ border: `2px dashed ${colors.border}`, borderRadius: borderRadius.lg, padding: spacing[8], textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={handleUpload}
          >
            <motion.div animate={{ scale: isDragging ? 1.12 : 1, rotate: isDragging ? [0, 5, -5, 0] : 0 }} transition={{ type: 'spring', stiffness: 300 }} style={{ width: 88, height: 88, margin: '0 auto', background: `linear-gradient(135deg, ${colors.accent}25, ${colors.accent}10)`, borderRadius: borderRadius.full, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent, marginBottom: spacing[3], boxShadow: isDragging ? `0 0 0 12px ${colors.accent}15` : 'none' }}>
              <UploadIcon size={40} />
            </motion.div>
            <h3 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>{isDragging ? 'Drop your file here!' : 'Drag & drop your file here'}</h3>
            <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[4] }}>or click to browse • PNG, JPG up to 10MB</p>
            <Button size="lg">Choose File</Button>
          </motion.div>
        </Card>
      </motion.div>

      {/* Methods */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3], marginTop: spacing[4] }}>
        {methods.map((method, index) => (
          <motion.div key={method.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 + index * 0.1 }} whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.98 }}>
            <Card hoverable padding={4} onClick={handleUpload} style={{ background: method.gradient, border: `1px solid ${colors.border}`, cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                <div style={{ color: colors.accent, flexShrink: 0 }}>{method.icon}</div>
                <div>
                  <div style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: 2 }}>{method.label}</div>
                  <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{method.desc}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
