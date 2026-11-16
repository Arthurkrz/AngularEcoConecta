import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../core/services/storage';
import { EcoMember } from '../../models/eco-member';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private readonly fb = inject(FormBuilder);
  private readonly storage = inject(StorageService);
  readonly feedback = signal('');
  readonly error = signal('');
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\p{L}\s]{3,}$/u)]],
    email: ['', [Validators.required, Validators.email]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    interest: ['', Validators.required],
  });

  cadastrar(): void {
    this.feedback.set('');
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();
    try {
      const members = this.storage.read<EcoMember>('members');
      if (members.some(m => m.email.trim().toLocaleLowerCase('pt-BR') === data.email.trim().toLocaleLowerCase('pt-BR'))) {
        this.error.set('Este e-mail já está cadastrado neste navegador.');
        return;
      }
      this.storage.write<EcoMember>('members', [
        ...members,
        { ...data, name: data.name.trim(), email: data.email.trim(), city: data.city.trim(), id: Date.now() },
      ]);
      this.form.reset();
      this.feedback.set('Cadastro realizado localmente! Confira seus dados no Meu painel.');
    } catch {
      this.error.set('Não foi possível salvar o cadastro neste navegador.');
    }
  }
}
