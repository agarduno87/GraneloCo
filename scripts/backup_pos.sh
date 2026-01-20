#!/bin/bash
FECHA=$(date +%Y%m%d_%H%M%S)
cp /Users/antoniogarduno/Downloads/GraneloCo/pos.db /Users/antoniogarduno/Downloads/GraneloCo/scripts/backups/pos_$FECHA.db
echo "Backup realizado: pos_$FECHA.db"
