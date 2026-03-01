## Contributing

### Branch Naming
- `feature/` para nuevas features
- `fix/` para bugfixes
- `docs/` para documentación
- `chore/` para tareas de mantenimiento

### Commit Messages
- Usar presente: "Add feature" no "Added feature"
- Ser descriptivo: "Fix patient list sorting bug" no "Fix bug"
- Referenciar issues: "Closes #123"

### PR Process
1. Crear PR con descripción clara
2. Tests y linting deben pasar
3. Al menos 1 review (backend) y 1 (frontend)
4. Merge a develop, después main

### Code Style
- Backend: ESLint + Prettier
- Frontend: ESLint + Prettier
- Ejecutar: `npm run format`

### Testing
- Cobertura mínima: 70%
- Tests para features críticas
- E2E tests para flujos principales
